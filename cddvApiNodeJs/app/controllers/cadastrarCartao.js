//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarCartao(application, request, response){

    let dados           = request.body;
    let modelCadastrarCartao = null;
    let erros_aux       = null;
    let erros           = [];

    // Validando informações 
    erros_aux = validacao.isObjectEmpty(dados, ["cartao_sus"]);
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

    if (erros.length > 0){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_invalidos: erros
                                 });
        return; 
    }

    modelCadastrarCartao = new application.app.models.cadastrarCartaoDAO();  //Instanciando model de CadastrarCartao
    modelCadastrarCartao.salvaCadastrarCartao(dados, response);              //Enviando CadastrarCartao para o model para ser salvo.
    
};

/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaCadastrarCartao(application, request, response){
    
    let dados           = request.body;
    let erros_aux       = null;
    let erros           = [];

    // Validando informações
    erros_aux = validacao.isObjectEmpty(dados);

    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

    if (erros.length > 0){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_invalidos: erros
                                 });
        return; 
    }
        
    modelCadastrarCartao = new application.app.models.cadastrarCartaoDAO();   //Instanciando model do cadastrarCartao
    modelCadastrarCartao.atualizaCadastrarCartao(dados, response);            //Enviando Cadastro do cartao para o model para ser salvo.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaCadastrarCartao(application, request, response){

    let numeroCartao_sus    = Number.parseInt(request.params.cartao_sus);
    let modelCadastrarCartao = null;
    let erros           = null;
           
    // Validando informações

    if ( Number.isNaN( numeroCartao_sus ) ){
        erros = ["cartao_sus"];
    };

    if( erros ){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_numericos: erros
                                  });
        return; 
    }

    modelCadastrarCartao = new application.app.models.cadastrarCartaoDAO();   //Instanciando model de CadastrarCartao
    modelCadastrarCartao.deletaCadastrarCartao(numeroCartao_sus, response);       //Enviando o Cadastro do cartao para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCadastrarCartao(application, request, response){

    let modelCadastrarCartao = null;

    modelCadastrarCartao = new application.app.models.cadastrarCartaoDAO();   //Instanciando model do cartao
    modelCadastrarCartao.getAllCadastrarCartao(response);       

}

/**
 * Exportando funções 
 */
module.exports={
    salvaCadastrarCartao, 
    atualizaCadastrarCartao,
    deletaCadastrarCartao,
    getAllCadastrarCartao,  
}