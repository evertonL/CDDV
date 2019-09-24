/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE VACINAS
 */
export class Vacina {

    private qtd_vacinas              : number;
    private nome                     : String;
    private lote                     : String;
    private cnes                     : String = '11111111'; //retirar quando tiver logando
    private nome_da_unidade          : String;
    private select_tempo_imunizacao  : String;
    private periodo_de_imunizacao    : String;
   
    

    /**
    * @constructor
    * @param {number } qtd_vacinas                 
    * @param {String } nome                       
    * @param {String } lote             
    * @param {String } nome_da_unidade                  
    * @param {String } periodo_de_imunizacao
    * @param {String } select_tempo_imunizacao                                                 
    */
    constructor(qtd_vacinas?: number, nome?: String,
        lote?: String, nome_da_unidade?: String,
        periodo_de_imunizacao?: String, select_tempo_imunizacao?: String) {

        this.qtd_vacinas = qtd_vacinas;
        this.nome = nome;
        this.lote = lote;
        this.nome_da_unidade = nome_da_unidade;
        this.periodo_de_imunizacao = periodo_de_imunizacao;
        this.select_tempo_imunizacao = select_tempo_imunizacao;

    }

    // -----------------GET----------------

    /**
    * @description: Retorna numero do qtd_vacinas.
    * @return {number} ( qtd_vacinas ) - código identificador.
    */
    public getQtdVacina(): number {
        return this.qtd_vacinas;
    }

    /**
    * @description: Retorna o nome.
    * @return {String} ( nome ) - código identificador.
    */
    public getNome(): String {
        return this.nome;
    }

    /**
    * @description: Retorna a lote
    * @return {String} ( lote ) - código identificador.
    */
    public getLote(): String {
        return this.lote;
    }

    /**
    * @description: Retorna o nome_da_unidade
    * @return {String} ( nome_da_unidade ) - código identificador.
    */
    public getNomeDaUnidade(): String {
        return this.nome_da_unidade;
    }

    /**
    * @description: Retorna o periodo_de_imunizacao
    * @return {String} ( periodo_de_imunizacao ) - código identificador.
    */
    public getPeriodoDeImunizacao(): String {
        return this.periodo_de_imunizacao;
    }
    
    /**
    * @description: Retorna o periodo_de_imunizacao
    * @return {String} ( select_tempo_imunizacao ) - código identificador.
    */
    public getSelectImunizacao(): String {
        return this.select_tempo_imunizacao;
    }

    //-----------------SET-----------------------

    /**
    * @description: Seta código identicador.
    * @param qtd_vacinas - Código identicador.
    */
    public setQtdVacina(qtd_vacinas: number): void {
        this.qtd_vacinas = qtd_vacinas;
    }

    /**
    * @description Seta código identicador.
    * @param nome - Código identicador.
    */
    public setNome(nome: String): void {
        this.nome = nome;
    }

    /**
    * @description Seta código identicador.
    * @param lote - Código identicador.
    */
    public setLote(lote: String): void {
        this.lote = lote;
    }

    /**
    * @description Seta código identicador.
    * @param nome_da_unidade - Código identicador.
    */
    public setNomeDaUnidade(nome_da_unidade: String): void {
        this.nome_da_unidade = nome_da_unidade;
    }

    /**
    * @description Seta código identicador.
    * @param periodo_de_imunizacao - Código identicador.
    */
    public setPeriodoDeImunizacao(periodo_de_imunizacao: String): void {
        this.periodo_de_imunizacao = periodo_de_imunizacao;
    }

    /**
    * @description Seta código identicador.
    * @param select_tempo_imunizacao - Código identicador.
    */
    public setSelectImunizacao(select_tempo_imunizacao: String): void {
        this.select_tempo_imunizacao = select_tempo_imunizacao;
    }

}