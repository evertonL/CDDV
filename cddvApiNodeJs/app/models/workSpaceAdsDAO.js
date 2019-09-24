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
     * @description Consulta o cartao da populacao no banco de dados pelo numero do cartao do sus
     * @param {String  } cartao_sus, descricao à ser pesquisada.
     * @param {response} response 
     */
    getCartaoDaPopulacao(cartao_sus , response){

        let cSql = "SELECT populacao.nome                        , "
                        + " vacinas.id_vacina                    , "
                        + " vacinas.lote                         , "
                        + " cartao.aplicada                      , "
                        + " agente_de_saude.nome AS nome_agente  , "
                        + " ubs.nome_da_unidade                  , "
                        + " cartao.data_aplicacao                , " 
                        + " cartao.data_validade                   "
                +"  FROM    "
                        + " populacao                                                              "
                        + " INNER JOIN cartao ON(cartao.cartao_sus = populacao.cartao_sus)         "
                        + " INNER JOIN vacinas ON(vacinas.id_vacina = cartao.vacinas_id )           "
                        + " INNER JOIN agente_de_saude ON(agente_de_saude.cpf = cartao.cpf_agente) "
                        + " INNER JOIN ubs ON(ubs.cnes = agente_de_saude.cnes)                     "
                +"  WHERE   " 
                        + " populacao.cartao_sus  = $1                                             "

                    
        let aValues = [ cartao_sus ];

        topConnection.executaQuery(cSql, aValues,  response, sucesso_consultando, erro_consultando);      
    }

    /**
     * @description Consulta da populacao no banco de dados pelo numero do cartao do sus
     * @param {String  } cartao_sus, descricao à ser pesquisada.
     * @param {response} response 
     */
    getChecarPopulacao(cartao_sus , response){

        let cSql = "SELECT                          "
                    + "   nome_da_mae            , "
                    + "   municipio_de_nacimento , "
                    + "   estado                 , "
                    + "   endereco               , "
                    + "   nome_do_pai            , "
                    + "   sexo                   , "
                    + "   nome                   , "
                    + "   data_nacimento         , "
                    + "   senha                    "
                    + "   FROM populacao           "
                    + " WHERE                      "
                    + "   cartao_sus = $1          "

                    
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