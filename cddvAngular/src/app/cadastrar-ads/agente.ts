/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE AGENTE
 */
export class Agente{

    private cpf            :   number;
    private nome           :   string;
    private senha          :   string;
    private rg             :   number;
  
    /**
     * @constructor
     * @param {number } cpf  
     * @param {string } nome 
     * @param {string } senha
     * @param {number } rg
     */
    constructor(cpf?: number, nome?: string, senha?: string, rg?: number) {
  
      this.cpf = cpf;
      this.nome = nome;
      this.senha = senha;
      this.rg = rg;
    }
  
    /**
     * @description: Retorna numero do cpf.
     * @return {number} ( cpf ) - código identificador.
     */
    public getCpfAgente(): number {
      return this.cpf;
    }
  
    /**
     * @description: Retorna o nome do agente.
     * @return {number} ( nome ) - código identificador.
     */
    public getNameAgente(): string {
      return this.nome;
    }
  
    /**
     * @description: Retorna a senha do agente.
     * @return {number} ( senha ) - código identificador.
     */
    public getSenha(): string {
      return this.senha;
    }
  
    /**
     * @description: Retorna o rg do agente.
     * @return {number} ( rg ) - código identificador.
     */
    public getRgAgente(): number {
      return this.rg;
    }
  
  
    /**
     * @description: Seta código identicador.
     * @param {number} cpf - Código identicador.
     */
    public setCpfAgente(cpf: number): void {
      this.cpf = cpf;
    }
  
    /**
     * @description Seta código identicador.
     * @param nome - Código identicador.
     */
    public setNameAgente(nome: string): void {
      this.nome = nome;
    }
  
    /**
     * @description Seta código identicador.
     * @param senha Código identicador.
     */
    public setSenha(senha: string): void {
      this.senha = senha;
    }
  
    /**
     * @description Seta código identicador.
     * @param rg - Código identicador.
     */
    public setRgAgente(rg: number): void {
      this.rg = rg;
    }
}