//Bibliotecas
const topConnection = require("./processosPG");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class RelatorioDAO {

    /**
     * @constructor
     */
    constructor() { }

    /**
     * @description Consulta as informacoes para gerar o relatorio de acordo com cnes da UBS
     * @param {String  } cnes, descricao à ser pesquisada.
     * @param {response} response 
     */
    getRelatorio(cnes , response){

        let cSql = "SELECT" 
        +" vacinas.nome AS vacina_nome          , "
        +" vacinas.lote                         , "
        +" agente_de_saude.nome AS nome_agente  , "
        +" cartao.data_aplicacao                  "
        +" FROM " 
        +" populacao"                                                           
        +" INNER JOIN cartao ON(cartao.cartao_sus = populacao.cartao_sus)        "
        +" INNER JOIN vacinas ON(vacinas.id_vacina = cartao.vacinas_id )         " 
        +" INNER JOIN agente_de_saude ON(agente_de_saude.cpf = cartao.cpf_agente)"
        +" INNER JOIN ubs ON(ubs.cnes = agente_de_saude.cnes)                    "
        +" WHERE " 
        +" ubs.cnes  = $1 AND cartao.aplicada = true                             "

                    
        let aValues = [ cnes ];

        topConnection.executaQuery(cSql, aValues,  response, sucesso_consultando, erro_consultando);      
    }

  
}


/**
* Exportando instancia da classe
*/
module.exports = function () {
    return RelatorioDAO;
}