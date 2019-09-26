//Bibliotecas
const validacao          = require("./../libs/validacao");
const { erro_campos  }   = require("./../libs/msgsErroSucessoApi");
const { erro_logando }   = require("./../libs/msgsErroSucessoApi");
const jwt                = require('jsonwebtoken');
const crypto             = require("crypto");

// carrega arquivos .env & .env.exemple que estão na raiz do projeto.
require("dotenv-safe").config();

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar e assim ver se pode efetuar login.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 * @Obs   : Esse controller foi implementado de forma diferente dos demais controllers da aplicação,
 *          nele foi usado o await para poder tratar a forma assincrona do  JavaScript e poder responder as requisições pelo controller.
 */
function loginUbs(application, request, response){

    let dados                = request.body
    let modelWorkSpaceUbsDAO = null;
    let usuarioUbs           = null;
    let erros_aux            = null;
    let erros                = [];
    
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validacao.isObjectEmpty({"cnes":dados.cnes, "senha":dados.senha});
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;

    }

    if (erros.length > 0){

        response.status(422).json({ 

                                    status:3, 
                                    mensagem: erro_campos,
                                    campos_invalidos: erros

                                 });
        return; 
    }

    
    // Criptografo a senha oriunda da requisição antes de validar
    dados.senha = crypto.createHash('MD5')
                        .update(dados.senha)
                        .digest('hex');

    //Instanciando model do usuario
    modelWorkSpaceUbsDAO = new application.app.models.WorkSpaceUbsDAO();
    
    (async() => {

        //Recupera o usuario do banco se ele existir e a senha for válida e ele não estiver bloqueado.
        usuarioUbs =  await modelWorkSpaceUbsDAO.ProcuraUbsParaLogin(dados.cnes, dados.senha) ;   
        
        console.log("usuario autenticado - " , usuarioUbs);

        //Caso o usuário exista e a senha estiver Ok
        if(usuarioUbs.length > 0 ){
            
            //monta payload
            let cnes   = usuarioUbs[0].cpf;
            let nome_da_unidade   = usuarioUbs[0].nome_da_unidade;
            
            let token = jwt.sign({ cnes, nome_da_unidade }, process.env.SECRET, {
                expiresIn: "2h" // expires in 4h horas
            });
            response.status(200).json({ auth: true, token: token });

        }else {

            response.status(401).json({
                                        status:3,
                                        mensagem:erro_logando
                                      });

        }

    })().catch(e => response.status(500).json({
        mensagem: e
    }));

}

/**
 * @description : Pega os dados do request e válida se existe o token necessário para poder prosseguir com a aplicação.
 * @param {Reqest  } request request da requisção 
 * @param {Response} response response do request
 * @param {*} next função para que o NodeJS siga o fluxo e não fique esperando.
 */
function verifyJWT(request, response, next){

    let token = request.headers['x-access-token'];
    // console.log("token recebido =  ",token);

    if (!token) return response.status(401).json({ auth: false, mensagem: 'Nenhum token fornecido. Erro 401 - Não autorizado.' });
     
    jwt.verify(token, process.env.SECRET, function(err, decoded) {

        if (err) return response.status(500).json({ auth: false, mensagem: 'Falha ao autenticar o token. Faça login novamente!' });
        
        // Se tudo estiver ok, salva no request para uso posterior
        request.cnes = decoded.cnes;
        next();
    });
}


/**
* Exportando funções 
*/
module.exports = {
    loginUbs ,
    verifyJWT
}