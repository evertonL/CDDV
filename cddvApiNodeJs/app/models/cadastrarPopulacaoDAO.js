//Bibliotecas
const topConnection = require("./processosPG");
const { erro_inserindo, sucesso_inserindo } = require("./../libs/msgsErroSucessoApi");
const { erro_atualizando, sucesso_atualizando } = require("./../libs/msgsErroSucessoApi");
const { erro_deletando, sucesso_deletando } = require("./../libs/msgsErroSucessoApi");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class CadastrarPopulacaoDAO {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @description : Salva o Cadastror da Populacao no banco de dados.
     * @param cadastrarPopulacao, objeto contendo informações da novo cadastrarPopulacao que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarPopulacao(cadastrarPopulacao, response) {

        let cSql = "INSERT INTO populacao("
            + "                 cartao_sus             , "  //[01]
            + "                 nome_da_mae            , "  //[02]
            + "                 municipio_de_nacimento , "  //[03]   
            + "                 estado                 , "  //[04]
            + "                 endereco               , "  //[05]
            + "                 nome_do_pai            , "  //[06] 
            + "                 sexo                   , "  //[07]
            + "                 nome                   , "  //[08]
            + "                 data_nacimento         , "  //[09]
            + "                 senha                    "  //[10]
            + "                )"
            + "        VALUES  ("
            + "                 $1  ,  "
            + "                 $2  ,  "
            + "                 $3  ,  "
            + "                 $4  ,  "
            + "                 $5  ,  "
            + "                 $6  ,  "
            + "                 $7  ,  "
            + "                 $8  ,  "
            + "                 $9  ,  "
            + "                 $10    "
            + "                )";

        let aValues = [
                cadastrarPopulacao.cartao_sus            ,
                cadastrarPopulacao.nome_da_mae           ,
                cadastrarPopulacao.municipio_de_nacimento,
                cadastrarPopulacao.estado                ,
                cadastrarPopulacao.endereco              ,
                cadastrarPopulacao.nome_do_pai           ,
                cadastrarPopulacao.sexo                  ,
                cadastrarPopulacao.nome                  ,
                cadastrarPopulacao.data_nacimento        ,
                cadastrarPopulacao.senha                 
        ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_inserindo, erro_inserindo);
    }

    /**
     * @description: Atualiza a informacao da Passoa em questao no banco de dados.
     * @param {*} numeroCartao_sus, cpf do agente_de_saude que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaCadastrarPopulacao(numeroCartao_sus, response) {
    
        let cSql = "UPDATE populacao SET"
        + "                 nome_da_mae =            $1 , "
        + "                 municipio_de_nacimento = $2 , "   
        + "                 estado =                 $3 , "
        + "                 endereco =               $4 , "
        + "                 nome_do_pai =            $5 , "
        + "                 sexo =                   $6 , "
        + "                 nome =                   $7 , "
        + "                 data_nacimento =         $8 , "
        + "                 senha =                  $9   "
        + "                 WHERE cartao_sus =       $10  "

    let aValues = [
            numeroCartao_sus.nome_da_mae           ,
            numeroCartao_sus.municipio_de_nacimento,
            numeroCartao_sus.estado                ,
            numeroCartao_sus.endereco              ,
            numeroCartao_sus.nome_do_pai           ,
            numeroCartao_sus.sexo                  ,
            numeroCartao_sus.nome                  ,
            numeroCartao_sus.data_nacimento        ,
            numeroCartao_sus.senha                 ,
            numeroCartao_sus.cartao_sus            ,
    ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_atualizando, erro_atualizando);
    }

    /**
     * @description: Deleta a populacao do banco de dados.
     * @param {*} numeroCartao_sus, Caratao_sus do agente_de_saude que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaCadastrarPopulacao(numeroCartao_sus, response) {

        let cSql = "DELETE FROM populacao WHERE cartao_sus = $1";
        let aValues = [numeroCartao_sus];

        topConnection.executaQuery(cSql, aValues, response, sucesso_deletando, erro_deletando);
    }

    /**
    * @description Consulta todos os agente_de_saudes cadastradas no banco de dados
    * @param {response} response 
    */
   getAllCadastrarPopulacao(response) {

        let cSql = "SELECT cartao_sus             , "
                        +" nome_da_mae            , "
                        +" municipio_de_nacimento , "
                        +" estado                 , "
                        +" endereco               , "
                        +" nome_do_pai            , "
                        +" sexo                   , "
                        +" nome                   , "
                        +" data_nacimento         , "
                        +" senha                    "
                        +" FROM populacao           "
                        +" ORDER BY cartao_sus      "

        topConnection.executaQuery(cSql, [], response, sucesso_consultando, erro_consultando);
    } 
}


/**
 * Exportando instancia da classe
 */
module.exports = function () {
    return CadastrarPopulacaoDAO;
}