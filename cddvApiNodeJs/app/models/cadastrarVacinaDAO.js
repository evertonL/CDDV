//Bibliotecas
const topConnection = require("./processosPG");
const { erro_inserindo, sucesso_inserindo } = require("./../libs/msgsErroSucessoApi");
const { erro_atualizando, sucesso_atualizando } = require("./../libs/msgsErroSucessoApi");
const { erro_deletando, sucesso_deletando } = require("./../libs/msgsErroSucessoApi");
const { erro_consultando, sucesso_consultando } = require("./../libs/msgsErroSucessoApi");

class CadastrarVacinasDAO {

    /**
     * @constructor
     */
    constructor() {

    }

    /**
     * @description : Salva o cadastro da nova Vacina no banco de dados.
     * @param cadastrarVacina, objeto contendo informações da novo CadastrarVacina que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarVacina(cadastrarVacina, response) {

        let cSql = "INSERT INTO vacinas("
            + "                 qtd_vacinas           , "  //[01]
            + "                 nome                  , "  //[02]   
            + "                 lote                  , "  //[03]
            + "                 nome_da_unidade       , "  //[04]
            + "                 periodo_de_imunizacao   "  //[05]
            + "                )"
            + "        VALUES  ("
            + "                 $1 ,  "
            + "                 $2 ,  "
            + "                 $3 ,  "
            + "                 $4 ,  "
            + "                 $5    "
            + "                )";

        let aValues = [
            cadastrarVacina.qtd_vacinas,
            cadastrarVacina.nome,
            cadastrarVacina.lote,
            cadastrarVacina.nome_da_unidade,
            cadastrarVacina.periodo_de_imunizacao,
        ];
        topConnection.executaQuery(cSql, aValues, response, sucesso_inserindo, erro_inserindo);
    }

    /**
     * @description: Atualiza o Cadastro da vacina no banco de dados.
     * @param {*} numeroId_vacina, id da vacina que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaCadastrarVacina(numeroId_vacina, response) {
    
        let cSql = "UPDATE vacinas SET"
                    + " qtd_vacinas =           $1 , "
                    + " nome =                  $2 , "
                    + " lote =                  $3 , "
                    + " nome_da_unidade =       $4 , "
                    + " periodo_de_imunizacao = $5   "
                    + " WHERE id_vacina =       $6   ";

        let aValues = [
            numeroId_vacina.qtd_vacinas,
            numeroId_vacina.nome,
            numeroId_vacina.lote,
            numeroId_vacina.nome_da_unidade,
            numeroId_vacina.periodo_de_imunizacao,
            numeroId_vacina.id_vacina
        ];

        topConnection.executaQuery(cSql, aValues, response, sucesso_atualizando, erro_atualizando);
    }

    /**
     * @description: Deleta a Vacina do banco de dados.
     * @param {*} numeroId_vacina, id da vacina que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaCadastrarVacina(numeroId_vacina, response) {

        let cSql = "DELETE FROM vacinas WHERE id_vacina = $1";
        let aValues = [numeroId_vacina];

        topConnection.executaQuery(cSql, aValues, response, sucesso_deletando, erro_deletando);
    }

    /**
    * @description Consulta todos as vacinas cadastradas no banco de dados
    * @param {response} response 
    */
    getAllCadastrarVacina(response) {

        let cSql = "SELECT id_vacina ,qtd_vacinas ,nome ,lote ,nome_da_unidade,periodo_de_imunizacao FROM vacinas"
            + " ORDER BY id_vacina "

        topConnection.executaQuery(cSql, [], response, sucesso_consultando, erro_consultando);
    } 
}


/**
 * Exportando instancia da classe
 */
module.exports = function () {
    return CadastrarVacinasDAO;
}