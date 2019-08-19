/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE VACINA NO CARTAO DA POPULAÇÃO
 */
export class Cartao {

    private cartao_sus: number;   // PFK
    private id_vacina: number;    // FK
    private data_aplicacao: Date;
    private aplicada: boolean;
    private cpf_agente: number;   // FK

    /**
     * @constructor
     * @param {number  }  cartao_sus                
     * @param {number  }  id_vacina                       
     * @param {Date    }  data_aplicacao             
     * @param {boolean }  aplicada                  
     * @param {number  }  cpf_agente                                                   
     */
    constructor(cartao_sus?: number, id_vacina?: number,
        data_aplicacao?: Date, aplicada?: boolean,
        cpf_agente?: number) {

        this.cartao_sus = cartao_sus;
        this.id_vacina = id_vacina;
        this.data_aplicacao = data_aplicacao;
        this.aplicada = aplicada;
        this.cpf_agente = cpf_agente;
    }

    // -----------------GET----------------

    /**
     * @description: Retorna o cartao_sus.
     * @return {number} ( cartao_sus ) - código identificador.
     */
    public getCartaoSus(): number {
        return this.cartao_sus;
    }

    /**
    * @description: Retorna numero do id_vacina.
    * @return {number} ( id_vacina ) - código identificador.
    */
    public getIdVacina(): number {
        return this.id_vacina;
    }


    /**
     * @description: Retorna a data_aplicacao
     * @return {Date} ( data_aplicacao ) - código identificador.
     */
    public getDataAplicacao(): Date {
        return this.data_aplicacao;
    }

    /**
     * @description: Retorna o aplicada
     * @return {boolean} ( aplicada ) - código identificador.
     */
    public getAplicada(): boolean {
        return this.aplicada;
    }

    /**
     * @description: Retorna o cpf_agente
     * @return {number} ( cpf_agente ) - código identificador.
     */
    public getCpfAgente(): number {
        return this.cpf_agente;
    }


    //-----------------SET-----------------------

    /**
     * @description Seta código identicador.
     * @param cartao_sus - Código identicador.
     */
    public setCartaoSus(cartao_sus: number): void {
        this.cartao_sus = cartao_sus;
    }

    /**
     * @description: Seta código identicador.
     * @param id_vacina - Código identicador.
     */
    public setIdVacina(id_vacina: number): void {
        this.id_vacina = id_vacina;
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
    public setAplicada(aplicada: boolean): void {
        this.aplicada = aplicada;
    }

    /**
    * @description Seta código identicador.
    * @param cpf_agente - Código identicador.
    */
    public setCpfAgente(cpf_agente: number): void {
        this.cpf_agente = cpf_agente;
    }

}