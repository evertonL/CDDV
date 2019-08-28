//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarPopulacao(application, request, response){

    let dados           = request.body;
    let modelCadastrarPopulacao = null;
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

    modelCadastrarPopulacao = new application.app.models.cadastrarPopulacaoDAO();  //Instanciando model de CadastrarUbs
    modelCadastrarPopulacao.salvaCadastrarPopulacao(dados, response);              //Enviando CadastrarUbs para o model para ser salvo.
    
};

/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaCadastrarPopulacao(application, request, response){
    
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
        
    modelCadastrarPopulacao = new application.app.models.cadastrarPopulacaoDAO();   //Instanciando model da frequencia
    modelCadastrarPopulacao.atualizaCadastrarPopulacao(dados, response);            //Enviando Cadastro de Ubs para o model para ser salvo.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaCadastrarPopulacao(application, request, response){

    let numeroCartao_sus    = Number.parseInt(request.params.cartao_sus);
    let modelCadastrarPopulacao = null;
    let erros           = null;
           
    // Validando informações

    if ( Number.isNaN( numeroCpf ) ){
        erros = ["cpf"];
    };

    if( erros ){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_numericos: erros
                                  });
        return; 
    }

    modelCadastrarPopulacao = new application.app.models.cadastrarPopulacaoDAO();   //Instanciando model de Cadastrar Agente
    modelCadastrarPopulacao.deletaCadastrarPopulacao(numeroCartao_sus, response);       //Enviando o Cadastrar Agente para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCadastrarPopulacao(application, request, response){

    let modelCadastrarPopulacao = null;

    modelCadastrarPopulacao = new application.app.models.cadastrarPopulacaoDAO();   //Instanciando model da frequencia
    modelCadastrarPopulacao.getAllCadastrarPopulacao(response);       

}

/**
 * Exportando funções 
 */
module.exports={
    salvaCadastrarPopulacao, 
    atualizaCadastrarPopulacao,
    deletaCadastrarPopulacao,
    getAllCadastrarPopulacao,  
}