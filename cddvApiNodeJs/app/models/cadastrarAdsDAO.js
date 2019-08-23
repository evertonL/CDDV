//Bibliotecas
const topConnection                    = require("./processosPG");

class CadastrarAdsDAO{

    /**
     * @constructor
     */
    constructor(){
                 
    }

    /**
     * @description : Salva nova CadastrarAds no banco de dados.
     * @param CadastrarAds, objeto contendo informações da novo CadastrarAds que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaCadastrarAds(cadastrarAds, response){

        let cSql    = "INSERT INTO agente(cpf,nome,senha,rg) VALUES ( UPPER( TRIM($1) ),$2,3$,$4$)";
        let aValues = [cadastrarAds.cpf,
                      cadastrarAds.nome,
                      cadastrarAds.senha,
                      cadastrarAds.rg];

        topConnection.executaQuery(cSql, aValues, response,'insert deu certo', 'insert deu errado');
    }
}

/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return CadastrarAdsDAO;
}