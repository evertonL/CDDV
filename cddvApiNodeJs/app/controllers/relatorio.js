//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getRelatorio(application, request, response){

    let dados             = request.params;
    let modelRelatorio = null;
    let erros_aux         = null;
    let erros             = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validacao.isObjectEmpty({cnes:dados.cnes});
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

    modelRelatorio = new application.app.models.relatorioDAO();   //Instanciando model da workSpaceAds
    modelRelatorio.getRelatorio(dados.cnes, response);       

}

/**
 * Exportando funções 
 */
module.exports = {
    getRelatorio
}