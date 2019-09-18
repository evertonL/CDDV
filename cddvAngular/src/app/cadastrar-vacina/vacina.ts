/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE VACINAS
 */
export class Vacina {

    private qtd_vacinas: number;
    private nome: string;
    private lote: string;
    private nome_da_unidade: string;
    private periodo_de_imunizacao: string;
    private cnes  : String = '11111111'; //retirar quando tiver logando

    /**
     * @constructor
     * @param {number } qtd_vacinas                 
     * @param {string } nome                       
     * @param {string } lote             
     * @param {string } nome_da_unidade                  
     * @param {string } periodo_de_imunizacao                                                   
     */
    constructor(qtd_vacinas?: number, nome?: string,
        lote?: string, nome_da_unidade?: string,
        periodo_de_imunizacao?: string) {

        this.qtd_vacinas = qtd_vacinas;
        this.nome = nome;
        this.lote = lote;
        this.nome_da_unidade = nome_da_unidade;
        this.periodo_de_imunizacao = periodo_de_imunizacao;

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
     * @return {string} ( nome ) - código identificador.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * @description: Retorna a lote
     * @return {string} ( lote ) - código identificador.
     */
    public getLote(): string {
        return this.lote;
    }

    /**
     * @description: Retorna o nome_da_unidade
     * @return {string} ( nome_da_unidade ) - código identificador.
     */
    public getNomeDaUnidade(): string {
        return this.nome_da_unidade;
    }

    /**
     * @description: Retorna o periodo_de_imunizacao
     * @return {string} ( periodo_de_imunizacao ) - código identificador.
     */
    public getPeriodoDeImunizacao(): string {
        return this.periodo_de_imunizacao;
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
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * @description Seta código identicador.
     * @param lote - Código identicador.
     */
    public setLote(lote: string): void {
        this.lote = lote;
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
    * @param periodo_de_imunizacao - Código identicador.
    */
    public setPeriodoDeImunizacao(periodo_de_imunizacao: string): void {
        this.periodo_de_imunizacao = periodo_de_imunizacao;
    }

}