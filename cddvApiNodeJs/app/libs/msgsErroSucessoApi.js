/**
 * @description: Mensagens do Projeto.
 * @param: Mensagens nas Operações realizadas com problemas oriundos de Parametros enviados na API de forma inválida
 */
const erro_api = "Campos inválidos ou não preenchidos.";

//---------------------------------------------------------------------------//

/**
 * @description: Mensagens do Projeto.
 * @param: Mensagens nas operações de inserção que contem ERRO
 */
const erro_inserindo = "Erro ao tentar inserir. "; 

/**
 * @description: Mensagens do Projeto.
 * @param: Mensagens nas operações de deletede que contem ERRO
 */
const erro_deletando = "Erro ao tentar deletar. ";

/**
 * @description: Mensagens do Projeto.
 * @param: Mensagens nas operações de atualizacao que contem ERRO
 */
const erro_atualizando = "Erro ao tentar atualizar. ";

/**
 * @description: Mensagens do Projeto.
 * @param: Mensagens nas operações de consulta que contem ERRO
 */
const erro_consultando = "Erro ao tentar realizar consulta. ";

//------------------------------------------------------------------------------//

/**
 * @description: Mensagens do Projeto.
 * @description: Mensagens nas operações inserção realizadas com SUCESSO
 */
const sucesso_inserindo = "Inserido com sucesso!";

/**
 * @description: Mensagens do Projeto.
 * @description: Mensagens nas operações de deletede realizadas com SUCESSO
 */
const sucesso_deletando = "Deletado com sucesso!";

/**
 * @description: Mensagens do Projeto.
 * @description: Mensagens nas operações de atualizacao  realizadas com SUCESSO
 */
const sucesso_atualizando = "Atualizado com sucesso!";

/**
 * @description: Mensagens do Projeto.
 * @description: Mensagens nas operações de consulta realizadas com SUCESSO
 */
const sucesso_consultando = "Consulta realizada com sucesso!";

//-------------------------------------------------------------------------------//

module.exports = {

    erro_deletando      ,
    erro_inserindo      ,
    erro_consultando    ,
    erro_atualizando    ,
    sucesso_inserindo   ,
    sucesso_deletando   ,
    sucesso_atualizando ,
    sucesso_consultando ,
    erro_api,
}