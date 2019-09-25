//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarUbs(application, request, response){

    let dados           = request.body;
    let modelCadastrarUbs = null;
    let erros_aux       = null;
    let erros           = [];

    //Validando informações 
    erros_aux = validacao.isObjectEmpty(dados, ["cnes"]);
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

    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();  //Instanciando model de CadastrarUbs
    modelCadastrarUbs.salvaCadastrarUbs(dados, response);              //Enviando CadastrarUbs para o model para ser salvo.
    
};

/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaCadastrarUbs(application, request, response){
    
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
        
    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();   //Instanciando model da frequencia
    modelCadastrarUbs.atualizaCadastrarUbs(dados, response);            //Enviando Cadastro de Ubs para o model para ser salvo.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaCadastrarUbs(application, request, response){

    let numeroCnes    = Number.parseInt(request.params.cnes);
    let modelCadastrarUbs = null;
    let erros           = null;
           
    // Validando informações

    if ( Number.isNaN( numeroCnes ) ){
        erros = ["cnes"];
    };

    if( erros ){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_numericos: erros
                                  });
        return; 
    }

    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();   //Instanciando model de Cadastrar Ubs
    modelCadastrarUbs.deletaCadastrarUbs(numeroCnes, response);       //Enviando o Cadastrar Ubs para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCadastrarUbs(application, request, response){

    let modelCadastrarUbs = null;
    
    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();   //Instanciando model da frequencia
    modelCadastrarUbs.getAllCadastrarUbs(response);       

}

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getUbsCnes(application, request, response){

    let dados             = request.params;
    let modelCadastrarUbs = null;
    let erros_aux         = null;
    let erros             = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validacao.isObjectEmpty({cnes:dados.cnes});
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

    modelCadastrarUbs = new application.app.models.cadastrarUbsDAO();   //Instanciando model da CadastrarUbs
    modelCadastrarUbs.getUbsCnes(dados.cnes, response);       

}

/**
 * Exportando funções 
 */
module.exports={
    salvaCadastrarUbs, 
    atualizaCadastrarUbs,
    deletaCadastrarUbs,
    getAllCadastrarUbs,
    getUbsCnes,  
}