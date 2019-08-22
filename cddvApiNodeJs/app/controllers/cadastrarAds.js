//Bibliotecas

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarAds(application, request, response){

    let dados           = request.body;
    let modelCadastrarAds = null;
    
     modelCadastrarAds = new application.app.models.CadastrarAdsDAO();   //Instanciando model de CadastrarAds
     modelCadastrarAds.salvaCadastrarAds(dados, response);               //Enviando CadastrarAds para o model para ser salva.
    
};