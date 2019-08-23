//Bibliotecas

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarUbs(application, request, response){

    let dados           = request.body;
    let modelCadastrarUbs = null;
    
     modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();   //Instanciando model de CadastrarUbs
     modelCadastrarUbs.salvaCadastrarUbs(dados, response);               //Enviando CadastrarUbs para o model para ser salva.
    
};

module.exports={
    salvaCadastrarUbs,   
}