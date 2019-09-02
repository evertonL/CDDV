//Bibliotecas
const topConnection = require("./processosPG");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class WorkSpaceAdsDAO {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @description Consulta a poupulacao no banco de dados pelo numero do cartao do sus
     * @param {String  } cartao_sus, descricao à ser pesquisada.
     * @param {response} response 
     */
    getPopulacaoPorCartao_sus(cartao_sus , response){

        let cSql    =  "SELECT cartao_sus FROM populacao "
                    +  " WHERE cartao_sus"
                    +  " ORDER BY cartao_sus "
                    
        let aValues = [ cartao_sus ];

        topConnection.executaQuery(cSql, aValues,  response, sucesso_consultando, erro_consultando);      
    }    
    
}


/**
 * Exportando instancia da classe
 */
module.exports = function () {
    return WorkSpaceAdsDAO;
}