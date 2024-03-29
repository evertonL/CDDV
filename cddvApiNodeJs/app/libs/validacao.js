/**
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/eval
 * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * 
 * @description Valida se existe algum elemento vazio no objeto.
 * @param   {JSON } objeto, objeto em formato JSON contendo campos que devem ser validados.
 * @param   {Array} array, array contendo chaves dos elementos do JSON que não deve ser validadas
 * @returns {JSON } se existir campos vazios, retorna um JSON contendo todas as chaves dos elementos
 *                  que estão vazios. Caso não exista nenhum campo vazio, retorna null.
 * @example 
 * isObjectEmpty( { nome:"Everton", sobrenome:"Luiz", idade:""}, [] ) //chamada
 * { campos_vazios: [ 'idade' ] } //retorno
 * 
 * @example 
 * isObjectEmpty( { nome:"Everton", sobrenome:"Luiz", idade:"19"}, [] ) //chamada
 * null //retorno
 * 
 * @example
 * isObjectEmpty( { nome:"", sobrenome:"Luiz", idade:"19"}, ["nome"] ) //chamada
 * null //retorno, nesse exemplo o nome apesar de estar vazio não é validado
 * 
 */

function isObjectEmpty(valida, naoValida){

    let objeto          = Object.assign({}, valida);
    let chaves          = []; 
    let valores         = [];
    let camposVazios    = [];
    let deletaElementos = "";

    //Retiro os elementos que não são para ser validados
    for(let i in naoValida){

        deletaElementos = "delete objeto."+naoValida[i];
        eval(deletaElementos);
    }

    //Percorro o objeto (JSON) para pegar o nome de cada chave 
    for(let obj in objeto){

        chaves.push(obj);
    }

    //Pego o valor contido dentro de cada chave 
    valores = Object.values(objeto);

    //Verifico quais campos estão vazios
    for(let i = 0; i < chaves.length; i++){

        //verifico se é uma string
        if(typeof valores[i] === 'string' ){
            
            if( valores[i].trim() == "" ){
    
                camposVazios.push(chaves[i]);
            }
        }
    } 

    return ( camposVazios.length > 0 ? { campos_vazios : camposVazios } : null );
}



//Exportando funções
module.exports = {
    isObjectEmpty,
}