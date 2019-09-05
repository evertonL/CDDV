//Bibliotecas
const validacao        = require("./../libs/validacao");
const { erro_campos }  = require("./../libs/msgsErroSucessoApi");
const { erro_logando } = require("./../libs/msgsErroSucessoApi");
const jwt              = require('jsonwebtoken');  // presisa instalar

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

    let dados        = request.body
    let modelUsuarioUbs = null;
    let usuario      = null;
    let erros_aux    = null;
    let erros        = [];
    
    // Validando informações //
    //----------------------//

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
    //------------------------------------------------------------//


    //Criptografo a senha que veio da requisição antes de validar
    //-----------------------------------------------------------//

    //Instanciando model da Ubs
    modelWorkSpaceUbs = new application.app.models.workSpaceUbs();
    
    (async() => {
        console.log(usuario)

        //Recupera a Ubs do banco se ela existir e a senha for válida e ele não estiver bloqueado.
        usuario =  await modelUsuarioUbs.ProcuraUbsParaLogin(dados.cnes, dados.senha) ;   
        
        console.log("Ubs Autenticado - " , usuario)

        //Caso o usuário exista e a senha estiver Ok
        if(usuario.length > 0 ){
            
            //monta payload
            let cnes   = usuario[0].cnes;
            let nome  = usuario[0].nome;
            
            let token = jwt.sign({ cnes, nome }, process.env.SECRET, {
                expiresIn: "10h" // expires in 10 horas
            });
            response.status(200).json({ auth: true, token: token });

        }else {

            response.status(401).json({
                                        status:3,
                                        mensagem:erro_logando
                                      });
        }

    })().catch(e => console.error(e));
    //--------------------------------------------------------------//
}

//Exportando funções 
module.exports = {
    loginUbs,
}