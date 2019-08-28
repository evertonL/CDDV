//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarAds(application, request, response){

    let dados           = request.body;
    let modelCadastrarAds = null;
    let erros_aux       = null;
    let erros           = [];

    // Validando informações 
    erros_aux = validacao.isObjectEmpty(dados, ["cpf"]);
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

    modelCadastrarAds = new application.app.models.cadastrarAdsDAO();  //Instanciando model de CadastrarUbs
    modelCadastrarAds.salvaCadastrarAds(dados, response);              //Enviando CadastrarUbs para o model para ser salvo.
    
};

/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaCadastrarAds(application, request, response){
    
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
        
    modelCadastrarAds = new application.app.models.cadastrarAdsDAO();   //Instanciando model da frequencia
    modelCadastrarAds.atualizaCadastrarAds(dados, response);            //Enviando Cadastro de Ubs para o model para ser salvo.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaCadastrarAds(application, request, response){

    let numeroCpf    = Number.parseInt(request.params.cpf);
    let modelCadastrarAds = null;
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

    modelCadastrarAds = new application.app.models.cadastrarAdsDAO();   //Instanciando model de Cadastrar Agente
    modelCadastrarAds.deletaCadastrarAds(numeroCpf, response);       //Enviando o Cadastrar Agente para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCadastrarAds(application, request, response){

    let modelCadastrarAds = null;

    modelCadastrarAds = new application.app.models.cadastrarAdsDAO();   //Instanciando model da frequencia
    modelCadastrarAds.getAllCadastrarAds(response);       

}

/**
 * Exportando funções 
 */
module.exports={
    salvaCadastrarAds, 
    atualizaCadastrarAds,
    deletaCadastrarAds,
    getAllCadastrarAds,  
}