/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE UBS
 */
export class Ubs {

    public cnes               : number;
    public nome_da_unidade    : string;
    public municipio          : string;
    public bairro             : string;
    public endereco           : string;
    public estado             : string;
    public telefone           : number;
    public cep                : number;
    public senha              : string;


    /**
     * @constructor
     * @param {number } cnes                 
     * @param {string } nome_da_unidade                       
     * @param {string } municipio             
     * @param {string } bairro                  
     * @param {string } endereco                  
     * @param {string } estado              
     * @param {number } telefone            
     * @param {number } cep 
     * @param {string } senha                                                                     
     */
    constructor(cnes?: number, nome_da_unidade?: string,
        municipio?: string, bairro?: string,
        endereco?: string, estado?: string,
        telefone?: number, cep?: number, senha?: string) {

        this.cnes = cnes;
        this.nome_da_unidade = nome_da_unidade;
        this.municipio = municipio;
        this.bairro = bairro;
        this.endereco = endereco;
        this.estado = estado;
        this.telefone = telefone;
        this.cep = cep;
        this.senha = senha;
    }

    // -----------------GET----------------

    /**
    * @description: Retorna numero do cnes.
    * @return {number} ( cnes ) - código identificador.
    */
    public getCnes(): number {
        return this.cnes;
    }

    /**
     * @description: Retorna o nome_da_unidade.
     * @return {string} ( nome_da_unidade ) - código identificador.
     */
    public getNomeDaUnidade(): string {
        return this.nome_da_unidade;
    }

    /**
     * @description: Retorna a municipio
     * @return {string} ( municipio ) - código identificador.
     */
    public getMunicipio(): string {
        return this.municipio;
    }

    /**
     * @description: Retorna o bairro
     * @return {string} ( bairro ) - código identificador.
     */
    public getBairro(): string {
        return this.bairro;
    }

    /**
     * @description: Retorna o endereco
     * @return {string} ( endereco ) - código identificador.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * @description: Retorna o estado
     * @return {string} ( estado ) - código identificador.
     */
    public getEstado(): string {
        return this.estado;
    }

    /**
     * @description: Retorna o telefone
     * @return {number} ( telefone ) - código identificador.
     */
    public gettelefone(): number {
        return this.telefone;
    }

    /**
     * @description: Retorna o cep
     * @return {number} ( cep ) - código identificador.
     */
    public getCep(): number {
        return this.cep;
    }
    
    /**
     * @description: Retorna o senha
     * @return {string} ( senha ) - código identificador.
     */
    public getSenha(): string {
        return this.senha;
    }
    

    //-----------------SET-----------------------

    /**
     * @description: Seta código identicador.
     * @param cnes - Código identicador.
     */
    public setCnes(cnes: number): void {
        this.cnes = cnes;
    }

    /**
     * @description Seta código identicador.
     * @param nome_da_unidade - Código identicador.
     */
    public setNomeDaUnidade(nome_da_unidade: string): void {
        this.nome_da_unidade = nome_da_unidade;
    }

    /**
     * @description Seta código identicador.
     * @param municipio - Código identicador.
     */
    public setMunicipio(municipio: string): void {
        this.municipio = municipio;
    }

    /**
    * @description Seta código identicador.
    * @param bairro - Código identicador.
    */
    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }

    /**
    * @description Seta código identicador.
    * @param endereco - Código identicador.
    */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
    * @description Seta código identicador.
    * @param estado - Código identicador.
    */
    public setEstado(estado: string): void {
        this.estado = estado;
    }

    /**
    * @description Seta código identicador.
    * @param telefone - Código identicador.
    */
    public setTelefone(telefone: number): void {
        this.telefone = telefone;
    }

    /**
    * @description Seta código identicador.
    * @param cep - Código identicador.
    */
    public setCep(cep: number): void {
        this.cep = cep;
    }

    /**
    * @description Seta código identicador.
    * @param senha - Código identicador.
    */
    public setSenha(senha: string): void {
    this.senha = senha;
}

}