
//Bibliotecas
const postgreSQL = require("./../../config/dbConnectionPg");

/**
 * @description Executa query no banco de dados PostegreSQL
 * @param {String  } cSql, query à ser executada
 * @param {Array   } aValues, array contendo valores a serem substituidos nos parametros [ $ ]
 * @param {Response} response, objeto de response do request. 
 * @see https://node-postgres.com/features/queries
 */
function executaQuery(cSql, aValues, response){
         
    let connection = null;

    connection = new postgreSQL.ConnectionPostgreSQL();   //Instanciando classe.
    connection = connection.openPoolConnection();         //Abrindo conexão com banco de dados.

    connection.query(cSql, aValues)
              .then(result => {   
                                    response.status(200).json({ 
                                                                status:1, 
                                                                mensagem:cMensagemSucesso,
                                                                linhas_afetadas: result.rowCount,
                                                                registros: result.rows 
                                                             });
                              })
              .catch(erros => {                                             
                                    response.status(500).json({ 
                                                                status:2, 
                                                                mensagem:cMensagemErro + erros 
                                                             });
                              })
              .finally(()  => {
                                    // console.log("Fechada conexão com banco de dados.");
                                    connection.end();
                              });
}

/**
 * Exportando funções
 */
module.exports = {
    executaQuery,
}