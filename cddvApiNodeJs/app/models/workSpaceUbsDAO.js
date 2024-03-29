//Bibliotecas
const topConnection = require("./processosPG");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class WorkSpaceUbsDAO {

    /**
     * @constructor
     */
    constructor() { }

    /**
    * @description Consulta todos os agente_de_saudes cadastradas no banco de dados pelo numero da UBS
    * @param {response} response 
    */
    getAdssPorUbs(cnes ,response) {

        let cSql = "SELECT cpf ,nome ,senha ,rg ,bloqueado FROM agente_de_saude"
            + " WHERE cnes = $1"

        let aValues = [ cnes ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_consultando, erro_consultando);
    }

    /**
    * @description Consulta todas as vacinas cadastradas no banco de dados pelo numero da UBS
    * @param {response} response 
    */
   getVacinasPorUbs(cnes ,response) {

    let cSql = "SELECT  id_vacina ,nome ,lote ,nome_da_unidade, select_tempo_imunizacao, periodo_de_imunizacao, qtd_vacinas,cnes FROM vacinas"
        + " WHERE cnes = $1"

    let aValues = [ cnes ];

    topConnection.executaQuery(cSql, aValues, response, sucesso_consultando, erro_consultando);
}

    //  /**
    //  * @description Consulta o agente no banco de dados pelo nome 
    //  * @param {String  } nome, descricao à ser pesquisada.
    //  * @param {number  } cnes, de queal Ubs o agente pertence
    //  * @param {response} response 
    //  */
    // getAgentePeloNome(cnes,nome ,response){

    //     let cSql = "SELECT  cpf                  , "
    //                     + " nome                , "
    //                     + " senha               , "
    //                     + " rg                  , "
    //                     + " bloqueado             "
    //             +"  FROM    "
    //                     + " agente_de_saude       "
    //             +"  WHERE   " 
    //                     + "(cnes = $1)AND(nome  = $2)            "

                    
    //     let aValues = [ cnes,nome ];

    //     topConnection.executaQuery(cSql, aValues,  response, sucesso_consultando, erro_consultando);      
    // }

    //  /**
    //  * @description Consulta o agente no banco de dados pelo numero do cpf
    //  * @param {String  } cartao_sus, descricao à ser pesquisada.
    //  * @param {response} response 
    //  */
    // getAgentePeloCpf(cpf ,response){

    //     let cSql = "SELECT  cpf                 , "
    //                     + " nome                , "
    //                     + " senha               , "
    //                     + " rg                  , "
    //                     + " bloqueado             "
    //             +"  FROM    "
    //                     + " agente_de_saude       "
    //             +"  WHERE   " 
    //                     + " cpf  = $1             "

                    
    //     let aValues = [ cpf ];

    //     topConnection.executaQuery(cSql, aValues,  response, sucesso_consultando, erro_consultando);      
    // }

    /**
     * @description Consulta a Ubs no banco de dados pelo cnes e senha.
     * @param {String  } cnes, cnes da Unidade Basica de Saude
     * @param {String  } senha, senha da Unidade Basica de Saude
     */
    async ProcuraUbsParaLogin(cnes , senha){

        let cSql    =  "SELECT cnes, "
                    +  "       nome_da_unidade " 
                    +  " FROM ubs "
                    +  " WHERE cnes   = $1  "
                    +  "   AND senha  = $2  "
                    +  "   AND bloqueado = false  ";
                    
        let aValues = [ 
                        cnes  ,
                        senha
                      ];
                      console.log('senha',senha);
                      console.log('cnes',cnes);
       //Executa a query e ja retorna a Ubs              
       return topConnection.executaQueryAsync(cSql, aValues, sucesso_consultando, erro_consultando);            
    }   
}

//Exportando instancia da classe
module.exports = function () {
    return WorkSpaceUbsDAO;
}