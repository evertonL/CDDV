//Bibliotecas
const validacao = require("./../libs/validacao");
const {erro_api}  = require("./../libs/msgsErroSucessoApi");

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllAdsPorUbs(application, request, response){

    let dados             = request.params;
    let modelWorkspaceUbs = null;
    let erros_aux         = null;
    let erros             = [];

    // Validando informações 

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

    modelWorkspaceUbs = new application.app.models.workSpaceUbsDAO();   //Instanciando model da workSpaceUbs
    modelWorkspaceUbs.getAllAdsPorUbs(dados.cnes, response);       

}

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAgentePeloNome(application, request, response){

    let dados             = request.params;
    let modelWorkspaceUbs = null;
    let erros_aux         = null;
    let erros             = [];

    // Validando informações 

    erros_aux = validacao.isObjectEmpty({nome:dados.nome});
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

    modelWorkspaceUbs = new application.app.models.workSpaceUbsDAO();   //Instanciando model da workSpaceUbs
    modelWorkspaceUbs.getAgentePeloNome(dados.nome, response);

}

function getAgentePeloCpf(application, request, response){

    let dados             = request.params;
    let modelWorkspaceUbs = null;
    let erros_aux         = null;
    let erros             = [];

    // Validando informações 

    erros_aux = validacao.isObjectEmpty({cpf:dados.cpf});
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

    modelWorkspaceUbs = new application.app.models.workSpaceUbsDAO();   //Instanciando model da workSpaceUbs
    modelWorkspaceUbs.getAgentePeloCpf(dados.cpf, response);

}


/**
 * Exportando funções 
 */
module.exports = {
    getAllAdsPorUbs,
    getAgentePeloNome,
    getAgentePeloCpf,
}