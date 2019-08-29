//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaCadastrarVacina(application, request, response){

    let dados           = request.body;
    let modelCadastrarVacinas = null;
    let erros_aux       = null;
    let erros           = [];

    // Validando informações 
    erros_aux = validacao.isObjectEmpty(dados, ["id_vacina"]);
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

    modelCadastrarVacinas = new application.app.models.cadastrarVacinaDAO();  //Instanciando model de CadastrarUbs
    modelCadastrarVacinas.salvaCadastrarVacina(dados, response);              //Enviando CadastrarUbs para o model para ser salvo.
    
};

/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaCadastrarVacina(application, request, response){
    
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
        
    modelCadastrarVacinas = new application.app.models.cadastrarVacinaDAO();   //Instanciando model da frequencia
    modelCadastrarVacinas.atualizaCadastrarVacina(dados, response);            //Enviando Cadastro de Ubs para o model para ser salvo.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaCadastrarVacina(application, request, response){

    let numeroId_vacinas    = Number.parseInt(request.params.id_vacinas);
    let modelCadastrarVacinas = null;
    let erros           = null;
           
    // Validando informações

    if ( Number.isNaN( numeroId_vacinas ) ){
        erros = ["id_vacina"];
    };

    if( erros ){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: erro_api,
                                    campos_numericos: erros
                                  });
        return; 
    }

    modelCadastrarVacinas = new application.app.models.cadastrarVacinaDAO();   //Instanciando model de Cadastrar Agente
    modelCadastrarVacinas.deletaCadastrarVacina(numeroId_vacinas, response);       //Enviando o Cadastrar Agente para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCadastrarVacina(application, request, response){

    let modelCadastrarVacinas = null;

    modelCadastrarVacinas = new application.app.models.cadastrarVacinaDAO();   //Instanciando model da frequencia
    modelCadastrarVacinas.getAllCadastrarVacina(response);       

}

/**
 * Exportando funções 
 */
module.exports={
    salvaCadastrarVacina, 
    atualizaCadastrarVacina,
    deletaCadastrarVacina,
    getAllCadastrarVacina,  
}