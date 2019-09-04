//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getCartaoDaPopulacao(application, request, response){

    let dados             = request.params;
    let modelWorkspaceAds = null;
    let erros_aux         = null;
    let erros             = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validacao.isObjectEmpty({cartao_sus:dados.cartao_sus});
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

    modelWorkspaceAds = new application.app.models.workSpaceAdsDAO();   //Instanciando model da workSpaceAds
    modelWorkspaceAds.getCartaoDaPopulacao(dados.cartao_sus, response);       

}

/**
 * Exportando funções 
 */
module.exports = {
    getCartaoDaPopulacao,
}