//Bibliotecas
const topConnection = require("./processosPG");
const { erro_inserindo, sucesso_inserindo } = require("./../libs/msgsErroSucessoApi");
const { erro_atualizando, sucesso_atualizando } = require("./../libs/msgsErroSucessoApi");
const { erro_deletando, sucesso_deletando } = require("./../libs/msgsErroSucessoApi");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class CadastrarCartaoDAO {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @description : Salva novo cartao no banco de dados.
     * @param cadastrarCartao, objeto contendo informações da novo Cartao que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarCartao(cadastrarCartao, response) {

        let cSql = "INSERT INTO cartao("
            + "                 cartao_sus         , "  //[01]
            + "                 vacinas_id         , "  //[02]
            + "                 data_aplicacao     , "  //[03]   
            + "                 aplicada           , "  //[04]
            + "                 cpf_agente         , "  //[05]
            + "                 data_validade        "  //[06]
            + "                )"
            + "        VALUES  ("
            + "                 $1 ,  "
            + "                 $2 ,  "
            + "                 $3 ,  "
            + "                 $4 ,  "
            + "                 $5 ,  "
            + "                 $6    "
            + "                )";

        let aValues = [
            cadastrarCartao.cartao_sus,
            cadastrarCartao.vacinas_id,
            cadastrarCartao.data_aplicacao,
            cadastrarCartao.aplicada,
            cadastrarCartao.cpf_agente,
            cadastrarCartao.data_validade,
        ];
        topConnection.executaQuery(cSql, aValues, response, sucesso_inserindo, erro_inserindo);
    }

    /**
     * @description: Atualiza o catao no banco de dados.
     * @param {*} numeroCartao_sus, numero do cartao da populacao que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaCadastrarCartao(numeroCartao_sus, response) {
    
        let cSql = "UPDATE cartao SET" 
                    +" data_aplicacao =    $1 ,"
                    +" aplicada =          $2 ,"      
                    +" cpf_agente =        $3 ,"    
                    +" data_validade =     $4  "
                    +" WHERE cartao_sus =  $5 AND vacinas_id = $6 "       

        let aValues = [
            numeroCartao_sus.data_aplicacao,
            numeroCartao_sus.aplicada,
            numeroCartao_sus.cpf_agente,
            numeroCartao_sus.data_validade,
            numeroCartao_sus.cartao_sus,
            numeroCartao_sus.vacinas_id
        ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_atualizando, erro_atualizando);
    }

    /**
     * @description: Deleta o cartao do banco de dados.
     * @param {*} numeroCartao_sus, numero do cartao do sus do cartao que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaCadastrarCartao(numeroCartao_sus, response) {

        let cSql = "DELETE FROM cartao WHERE cartao_sus = $1";
        let aValues = [numeroCartao_sus];

        topConnection.executaQuery(cSql, aValues, response, sucesso_deletando, erro_deletando);
    }

    /**
    * @description Consulta todos os cartoes cadastrados no banco de dados
    * @param {response} response 
    */
    getAllCadastrarCartao(response) {

        let cSql = "SELECT cartao_sus,vacina_id ,data_aplicacao ,aplicada ,cpf_agente ,data_validade FROM cartao"
            + " ORDER BY cartao_sus "

        topConnection.executaQuery(cSql, [], response, sucesso_consultando, erro_consultando);
    } 
}


/**
 * Exportando instancia da classe
 */
module.exports = function () {
    return CadastrarCartaoDAO;
}