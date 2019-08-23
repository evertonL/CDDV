//Bibliotecas
const topConnection                    = require("./processosPG");

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
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
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
                 + "                 TRIM($1) ,  "               
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
                    console.log("Aqui");
        topConnection.executaQuery(cSql, aValues, response,'insert deu CERTO', 'insert deu ERRADO ',);
    }
}

/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return CadastrarUbsDAO;
    
}