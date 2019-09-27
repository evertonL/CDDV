/**
 * @description : Classe de Objeto de tranferencia ( TO ) do CADASTRO DE AGENTE
 */
export class Agente{

    private cpf            :   String;
    private nome           :   String;
    private senha          :   String;
    private rg             :   String;
    private bloqueado      :   boolean;
    private cnes           :   String; // quando tiver logando tirar daquio valor
  
    /**
     * @constructor
     * @param {String } cpf  
     * @param {String } nome 
     * @param {String } senha
     * @param {String } rg
     * @param {boolean} bloqueado
     */
    constructor(cpf?: String, nome?: String, senha?: String, rg?: String ,bloqueado?: boolean, /*cnes?: String*/) {
  
      this.cpf       = cpf;
      this.nome      = nome;
      this.senha     = senha;
      this.rg        = rg;
      this.bloqueado = bloqueado;
      // this.cnes = cnes;
    }

    //--------------GET-------------------//
  
    /**
     * @description: Retorna numero do cpf.
     * @return {number} ( cpf ) - código identificador.
     */
    public getCpfAgente(): String {
      return this.cpf;
    }
  
    /**
     * @description: Retorna o nome do agente.
     * @return {number} ( nome ) - código identificador.
     */
    public getNameAgente(): String {
      return this.nome;
    }
  
    /**
     * @description: Retorna a senha do agente.
     * @return {String} ( senha ) - código identificador.
     */
    public getSenha(): String {
      return this.senha;
    }
  
    /**
     * @description: Retorna o rg do agente.
     * @return {String} ( rg ) - código identificador.
     */
    public getRgAgente(): String {
      return this.rg;
    }

    /**
     * @description: Retorna o se ta bloquado ou nao o agente.
     * @return {boolean} ( bloqueado ) - código identificador.
     */
    public getBloqueado(): boolean {
      return this.bloqueado;
    }
  
  //---------------SET------------------

    /**
     * @description: Seta código identicador.
     * @param {number} cpf - Código identicador.
     */
    public setCpfAgente(cpf: String): void {
      this.cpf = cpf;
    }
  
    /**
     * @description Seta código identicador.
     * @param nome - Código identicador.
     */
    public setNameAgente(nome: String): void {
      this.nome = nome;
    }
  
    /**
     * @description Seta código identicador.
     * @param senha Código identicador.
     */
    public setSenha(senha: String): void {
      this.senha = senha;
    }
  
    /**
     * @description Seta código identicador.
     * @param rg - Código identicador.
     */
    public setRgAgente(rg: String): void {
      this.rg = rg;
    }

    /**
     * @description Seta código identicador.
     * @param bloquado - Código identicador.
     */
    public setBloqueado(bloquado: boolean): void {
      this.bloqueado = bloquado;
    }


    //TENHO QUE TIRAR DEPOIS QUE TIVER LOGANDO
    public getCnes(): String {
      return this.cnes;
    }

    public setCnes(cnes: String): void {
      this.cnes = cnes;
    }
}