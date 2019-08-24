//Bibliotecas
const topConnection                    = require("./processosPG");
const {erro_inserindo, sucesso_inserindo} = require("./../libs/msgsErroSucessoApi"); 
const {erro_atualizando, sucesso_atualizando} = require("./../libs/msgsErroSucessoApi"); 
const {erro_deletando, sucesso_deletando} = require("./../libs/msgsErroSucessoApi"); 
const {erro_consultando, sucesso_consultando} = require("./../libs/msgsErroSucessoApi"); 

class CadastrarUbsDAO{

    /**
     * @constructor
     */
    constructor(){
                 
    }

    /**
     * @description : Salva nova CadastrarUbs no banco de dados.
     * @param cadastrarUbs, objeto contendo informações da novo CadastrarUbs que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarUbs(cadastrarUbs, response){

        let cSql = "INSERT INTO ubs("
                 + "                 cnes            ,  "  //[01]
                 + "                 nome_da_unidade ,  "  //[02]
                 + "                 municipio       ,  "  //[03]   
                 + "                 bairro          ,  "  //[04]
                 + "                 endereco        ,  "  //[05]
                 + "                 estado          ,  "  //[06]
                 + "                 telefone        ,  "  //[07]
                 + "                 cep             ,  "  //[08]
                 + "                 senha              "  //[09]
                 + "                )"  
                 + "        VALUES  ("         
                 + "                 $1 ,  "               
                 + "                 $2 ,  "
                 + "                 $3 ,  "
                 + "                 $4 ,  "
                 + "                 $5 ,  "
                 + "                 $6 ,  "
                 + "                 $7 ,  "
                 + "                 $8 ,  "
                 + "                 $9    "
                 + "                )";

        let aValues = [
                        cadastrarUbs.cnes,
                        cadastrarUbs.nome_da_unidade,
                        cadastrarUbs.municipio,
                        cadastrarUbs.bairro,
                        cadastrarUbs.endereco,
                        cadastrarUbs.estado,
                        cadastrarUbs.telefone,
                        cadastrarUbs.cep,
                        cadastrarUbs.senha
                    ];
        topConnection.executaQuery(cSql, aValues, response, sucesso_inserindo ,erro_inserindo);
    }
}

/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return CadastrarUbsDAO;
    
}