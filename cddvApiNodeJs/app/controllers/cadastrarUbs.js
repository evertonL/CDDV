//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarUbs(application, request, response){

    let dados           = request.body;
    let modelCadastrarUbs = null;
    let erros_aux       = null;
    let erros           = [];

    // Validando informações 
    erros_aux = validacao.isObjectEmpty(dados, ["cnes"]);
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

    if (erros.length > 0){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_invalidos: erros
                                 });
        return; 
    }

    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();  //Instanciando model de CadastrarUbs
    modelCadastrarUbs.salvaCadastrarUbs(dados, response);              //Enviando CadastrarUbs para o model para ser salva.
    
};

module.exports={
    salvaCadastrarUbs,   
}