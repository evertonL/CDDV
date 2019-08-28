//Bibliotecas
const topConnection = require("./processosPG");
const { erro_inserindo, sucesso_inserindo } = require("./../libs/msgsErroSucessoApi");
const { erro_atualizando, sucesso_atualizando } = require("./../libs/msgsErroSucessoApi");
const { erro_deletando, sucesso_deletando } = require("./../libs/msgsErroSucessoApi");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class CadastrarUbsDAO {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @description : Salva nova CadastrarUbs no banco de dados.
     * @param cadastrarAds, objeto contendo informações da novo CadastrarUbs que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarAds(cadastrarAds, response) {

        let cSql = "INSERT INTO agente_de_saude("
            + "                 cpf         ,  "  //[01]
            + "                 nome        ,  "  //[02]
            + "                 senha       ,  "  //[03]   
            + "                 rg          ,  "  //[04]
            + "                 cnes           "  //[05]
            + "                )"
            + "        VALUES  ("
            + "                 $1 ,  "
            + "                 $2 ,  "
            + "                 $3 ,  "
            + "                 $4 ,  "
            + "                 $5    "
            + "                )";

        let aValues = [
            cadastrarAds.cpf,
            cadastrarAds.nome,
            cadastrarAds.senha,
            cadastrarAds.rg,
            cadastrarAds.cnes,
        ];
        topConnection.executaQuery(cSql, aValues, response, sucesso_inserindo, erro_inserindo);
    }

    /**
     * @description: Atualiza Ubs no banco de dados.
     * @param {*} numeroCpf, cpf do agente_de_saude que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaCadastrarAds(numeroCpf, response) {
    
        let cSql = "UPDATE agente_de_saude SET"
                    + " nome =           $1 , "
                    + " senha =          $2 , "
                    + " rg =             $3 , "
                    + " cnes =           $4   "
                    + " WHERE cpf =      $5   ";

        let aValues = [
            numeroCpf.nome,
            numeroCpf.senha,
            numeroCpf.rg,
            numeroCpf.cnes,
            numeroCpf.cpf
        ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_atualizando, erro_atualizando);
    }

    /**
     * @description: Deleta Ubs do banco de dados.
     * @param {*} nuemroCpf, cpf do agente_de_saude que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaCadastrarAds(nuemroCpf, response) {

        let cSql = "DELETE FROM agente_de_saude WHERE cpf = $1";
        let aValues = [nuemroCpf];

        topConnection.executaQuery(cSql, aValues, response, sucesso_deletando, erro_deletando);
    }

    /**
    * @description Consulta todos os agente_de_saudes cadastradas no banco de dados
    * @param {response} response 
    */
    getAllCadastrarAds(response) {

        let cSql = "SELECT cpf ,nome ,senha ,rg ,cnes FROM agente_de_saude"
            + " ORDER BY cpf "

        topConnection.executaQuery(cSql, [], response, sucesso_consultando, erro_consultando);
    } 
}


/**
 * Exportando instancia da classe
 */
module.exports = function () {
    return CadastrarUbsDAO;
}