/**
 * @description : Classe de Objeto de tranferecia ( TO ) para aplicar vacina no cartão
 */
export class AplicadaVacinaCartao {

    private cartao_sus                : String  ;
    private vacinas_id                : String  ;
    private data_aplicacao            : Date    ;
    private aplicada                  : Boolean ;
    private cpf_agente                : String  ;
    private data_validade             : Date    ;

    /**
     * @constructor
     * @param {String } cartao_sus            
     * @param {String } vacinas_id            
     * @param {String } data_aplicacao 
     * @param {String } aplicada
     * @param {String } cpf_agente                 
     * @param {String } data_validade                            
     */
    constructor(cartao_sus?: String, vacinas_id?: String, data_aplicacao?: Date,
        aplicada?: Boolean, cpf_agente?: String, data_validade?: Date) {

        this.cartao_sus = cartao_sus;
        this.vacinas_id = vacinas_id;
        this.data_aplicacao = data_aplicacao;
        this.aplicada = aplicada;
        this.cpf_agente = cpf_agente;
        this.data_validade = data_validade;
    }

    // -----------------GET----------------

    /**
    * @description: Retorna numero do cartao_sus.
    * @return {String} ( cartao_sus ) - código identificador.
    */
    public getCartaoSus(): String {
        return this.cartao_sus;
    }

    /**
     * @description: Retorna o vacinas_id.
     * @return {String} ( vacinas_id ) - código identificador.
     */
    public getVacinasId(): String {
        return this.vacinas_id;
    }

    /**
     * @description: Retorna a data_aplicacao
     * @return {String} ( data_aplicacao ) - código identificador.
     */
    public getDataAplicacao(): Date {
        return this.data_aplicacao;
    }

    /**
     * @description: Retorna o aplicada
     * @return {String} ( aplicada ) - código identificador.
     */
    public getAplicada(): Boolean {
        return this.aplicada;
    }

    /**
     * @description: Retorna o aplicada
     * @return {String} ( cpf_agente ) - código identificador.
     */
    public getCpfAgente(): String {
        return this.cpf_agente;
    }

    /**
     * @description: Retorna o data_validade
     * @return {String} ( data_validade ) - código identificador.
     */
    public getDataValidade(): Date {
        return this.data_validade;
    }

    //-----------------SET-----------------------

    /**
     * @description: Seta código identicador.
     * @param cartao_sus - Código identicador.
     */
    public setCartaoSus(cartao_sus: String): void {
        this.cartao_sus = cartao_sus;
    }

    /**
     * @description Seta código identicador.
     * @param vacinas_id - Código identicador.
     */
    public setVacinasId(vacinas_id: String): void {
        this.vacinas_id = vacinas_id;
    }

    /**
     * @description Seta código identicador.
     * @param data_aplicacao - Código identicador.
     */
    public setDataAplicacao(data_aplicacao: Date): void {
        this.data_aplicacao = data_aplicacao;
    }

    /**
    * @description Seta código identicador.
    * @param aplicada - Código identicador.
    */
    public setAplicada(aplicada: Boolean): void {
        this.aplicada = aplicada;
    }

    /**
    * @description Seta código identicador.
    * @param cpf_agente - Código identicador.
    */
    public setcpf_agente(cpf_agente: String): void {
        this.cpf_agente = cpf_agente;
    }

    /**
    * @description Seta código identicador.
    * @param data_validade - Código identicador.
    */
    public setDataValidade(data_validade: Date): void {
        this.data_validade = data_validade;
    }

}