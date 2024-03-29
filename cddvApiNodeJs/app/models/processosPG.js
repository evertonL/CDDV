//Bibliotecas
const postgreSQL = require("./../../config/dbConnectionPg");

/**
 * @description Executa query no banco de dados PostegreSQL
 * @param {String  } cSql, query à ser executada
 * @param {Array   } aValues, array contendo valores a serem substituidos nos parametros [ $ ]
 * @param {Response} response, objeto de response do request. 
 * @param {String  } cMensagemSucesso, mensagem que deve ser enviada no response caso a execução da query obtenha exito
 * @param {String  } cMensagemErro, mensagem que deve ser enviada no response caso a execução da query gere erros
 * @see https://node-postgres.com/features/queries
 * 
 * @example
 * executaQuery("INSERT INTO ubs(cnes) VALUES ( $1 )", ['11111111'], response, 'insert deu certo', 'insert deu errado'); 
 */
function executaQuery(cSql, aValues, response, cMensagemSucesso, cMensagemErro){
         
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
 * @description Executa query no banco de dados PostegreSQL em modo async
 * @param {String  } cSql query à ser executada
 * @param {Array   } aValues array contendo valores a serem substituidos nos parametros [ $ ]
 * @param {String  } cMensagemSucesso mensagem que deve ser escrita no console caso a execução da query obtenha exito
 * @param {String  } cMensagemErro mensagem que deve ser escrita no console caso a execução da query gere erros
 * @return {Array  } irá ser retornado um array contendo todas as linhas rows que a query obteve.
 * @see https://node-postgres.com/features/queries
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/funcoes_assincronas
 * 
 * @example
 * executaQueryAsync("SELECT * usuarios WHERE cpf = TRIM( $1 ), ['00000000000'], response, 'select deu certo', 'select deu errado'); 
 */
async function executaQueryAsync(cSql, aValues, cMensagemSucesso, cMensagemErro){
         
    let connection = null;

    connection = new postgreSQL.ConnectionPostgreSQL();   //Instanciando classe.
    connection = connection.openPoolConnection();         //Abrindo conexão com banco de dados.

    // Retorna a Promisse que o await espera.
    return connection.query(cSql, aValues)
                     .then(result => {   
                                          console.log(cMensagemSucesso);                                          
                                          return  result.rows;
                                      })
                     .catch(erros => {     
                                          console.log(cMensagemErro + " / ", erros);
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
    executaQueryAsync
}