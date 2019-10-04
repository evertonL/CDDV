/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE VACINA NO CARTAO DA POPULAÇÃO
 */
export class Cartao {

    private nomeUsuarioCartao  : String   ;
    private nomeDaVacina       : String   ;
    private lote               : String   ;
    private statusVacina       : boolean  ;
    private nomeDoAgente       : String   ;
    private nomeDaUbs          : String   ;
    private dataDeAplicacao    : Date     ;
    private dataDeValidade     : Date     ;
    private cartao_sus         : String   ;
  
    /**
     * @constructor
     * @param {String  } nomeUsuarioCartao  
     * @param {String  } nomeDaVacina 
     * @param {String  } lote
     * @param {boolean } statusVacina;
     * @param {String  } nomeDoAgente
     * @param {String  } nomeDaUbs
     * @param {Date    } dataDeAplicacao
     * @param {Data    } dataDeValidade
     * @param {string  } cartao_sus
     */
    constructor(nomeUsuarioCartao?: String, nomeDaVacina?: String, lote?: String, statusVacina?: boolean, nomeDoAgente?: String ,
                nomeDaUbs?: String, dataDeAplicacao?: Date, dataDeValidade?: Date, cartao_sus?: String) {
  
      this.nomeUsuarioCartao  = nomeUsuarioCartao;
      this.nomeDaVacina       = nomeDaVacina;
      this.lote               = lote;
      this.statusVacina       = statusVacina;
      this.nomeDoAgente       = nomeDoAgente;
      this.nomeDaUbs          = nomeDaUbs;
      this.dataDeAplicacao    = dataDeAplicacao;
      this.dataDeValidade     = dataDeValidade;
      this.cartao_sus         = cartao_sus;

    }

    //--------------GET-------------------//
  
    /**
     * @description: Retorna nome do usuario do cartao de vacinas.
     * @return {String} ( nomeUsuarioCartao ) - código identificador.
     */
    public getnomeUsuarioCartao(): String {
      return this.nomeUsuarioCartao;
    }
  
    /**
     * @description: Retorna o nome Da Vacina que esta no cartao de vacinas.
     * @return {String} ( nomeDaVacina ) - código identificador.
     */
    public getNameVacina(): String {
      return this.nomeDaVacina;
    }
  
    /**
     * @description: Retorna a lote da vacina que esta no cartao de vacinas.
     * @return {String} ( lote ) - código identificador.
     */
    public getlote(): String {
      return this.lote;
    }

    /**
     * @description: Retorna true se a vacina estiver aplicada ou false se estiver agendada.
     * @return {boolean} ( statusVacina ) - código identificador.
     */
    public getStatusVacina(): boolean {
        return this.statusVacina;
      }
    
  
    /**
     * @description: Retorna o nome do Agente responsalvel pelo cadastro da vacina no cartao.
     * @return {String} ( nomeDoAgente ) - código identificador.
     */
    public getnomeDoAgente(): String {
      return this.nomeDoAgente;
    }

    /**
     * @description: Retorna nome de onde foi alicada a Vacina
     * @return {String} ( nomeDaUbs ) - código identificador.
     */
    public getnomeDaUbs(): String {
      return this.nomeDaUbs;
    }

     /**
     * @description: Retorna a data que a vacina foi aplicada.
     * @return {date} ( dataDeAplicacao ) - código identificador.
     */
    public getdataDeAplicacao(): Date {
        return this.dataDeAplicacao;
      }
    
       /**
     * @description: Retorna a data que a vacina perde sua validade.
     * @return {date} ( dataDeValidade ) - código identificador.
     */
    public getdataDeValidade(): Date {
        return this.dataDeValidade;
      }

       /**
     * @description: Retorna o numero do carto do sus do individuo.
     * @return {String} ( cartao_sus ) - código identificador.
     */
    public getCartaoSus(): String {
        return this.cartao_sus;
      }
  
  //---------------SET------------------

    /**
     * @description: Seta código identicador.
     * @param nomeUsuarioCartao - Código identicador.
     */
    public setnomeUsuarioCartao(nomeUsuarioCartao: String): void {
      this.nomeUsuarioCartao = nomeUsuarioCartao;
    }
  
    /**
     * @description Seta código identicador.
     * @param nomeDaVacina - Código identicador.
     */
    public setNameVacina(nomeDaVacina: String): void {
      this.nomeDaVacina = nomeDaVacina;
    }
  
    /**
     * @description Seta código identicador.
     * @param lote - Código identicador.
     */
    public setlote(lote: String): void {
      this.lote = lote;
    }

    /**
     * @description Seta código identicador.
     * @param {statusVacina} - Código identicador.
     */
    public setStatusVacina(statusVacina: boolean): void {
        this.statusVacina = statusVacina;
    }
  
    /**
     * @description Seta código identicador.
     * @param nomeDoAgente - Código identicador.
     */
    public setnomeDoAgente(nomeDoAgente: String): void {
      this.nomeDoAgente = nomeDoAgente;
    }

    /**
     * @description Seta código identicador.
     * @param nomeDaUbs - Código identicador.
     */
    public setnomeDaUbs(nomeDaUbs: String): void {
      this.nomeDaUbs = nomeDaUbs;
    }

    /**
     * @description Seta código identicador.
     * @param dataDeAplicacao - Código identicador.
     */
    public setdataDeAplicacao(dataDeAplicacao: Date): void {
      this.dataDeValidade = dataDeAplicacao;
    }

     /**
     * @description Seta código identicador.
     * @param dataDeValidade - Código identicador.
     */
    public setdataDeValidade(dataDeValidade: Date): void {
        this.dataDeValidade = dataDeValidade;
      }
    
     /**
     * @description Seta código identicador.
     * @param cartao_sus - Código identicador.
     */
    public setCartaoSus(cartao_sus: String): void {
        this.cartao_sus = cartao_sus;
      }


}