/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE POPULACÃO
 */
export class Populacao {

    private cartao_sus              : number;
    private nome_da_mae             : string;
    private municipio_de_nacimento  : string;
    private estado                  : string;
    private endereco                : string
    private nome_do_pai             : string;
    private sexo                    : string;
    private nome                    : string;
    private data_nacimento          : Date;
    private senha                   : string;

    /**
     * @constructor
     * @param {number } cartao_sus            
     * @param {string } nome_da_mae            
     * @param {string } municipio_de_nacimento 
     * @param {string } estado
     * @param {string } endereco                 
     * @param {string } nome_do_pai            
     * @param {string } sexo                   
     * @param {string } nome                   
     * @param {Date   } data_nacimento         
     * @param {string } senha                  
     */
    constructor(cartao_sus?: number, nome_da_mae?: string, municipio_de_nacimento?: string,
        estado?: string, endereco?: string, nome_do_pai?: string,
        sexo?: string, nome?: string,
        data_nacimento?: Date, senha?: string) {

        this.cartao_sus = cartao_sus;
        this.nome_da_mae = nome_da_mae;
        this.municipio_de_nacimento = municipio_de_nacimento;
        this.estado = estado;
        this.endereco = endereco;
        this.nome_do_pai = nome_do_pai;
        this.sexo = sexo;
        this.nome = nome;
        this.data_nacimento = data_nacimento;
        this.senha = senha;
    }

    // -----------------GET----------------

    /**
    * @description: Retorna numero do cartao_sus.
    * @return {number} ( cartao_sus ) - código identificador.
    */
    public getCartaoSus(): number {
        return this.cartao_sus;
    }

    /**
     * @description: Retorna o nome_da_mae.
     * @return {string} ( nome_da_mae ) - código identificador.
     */
    public getNomeDaMae(): string {
        return this.nome_da_mae;
    }

    /**
     * @description: Retorna a municipio_de_nacimento
     * @return {string} ( municipio_de_nacimento ) - código identificador.
     */
    public getMunicipioDeNacimento(): string {
        return this.municipio_de_nacimento;
    }

    /**
     * @description: Retorna o estado
     * @return {string} ( estado ) - código identificador.
     */
    public getEstado(): string {
        return this.estado;
    }

    /**
     * @description: Retorna o estado
     * @return {string} ( endereco ) - código identificador.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * @description: Retorna o nome_do_pai
     * @return {string} ( nome_do_pai ) - código identificador.
     */
    public getNomeDoPai(): string {
        return this.nome_do_pai;
    }

    /**
     * @description: Retorna o sexo
     * @return {string} ( sexo ) - código identificador.
     */
    public getSexo(): string {
        return this.sexo;
    }

    /**
     * @description: Retorna o nome
     * @return {string} ( nome ) - código identificador.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * @description: Retorna o data_nacimento
     * @return {string} ( data_nacimento ) - código identificador.
     */
    public getDataNacimento(): Date {
        return this.data_nacimento;
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
     * @param cartao_sus - Código identicador.
     */
    public setCartaoSus(cartao_sus: number): void {
        this.cartao_sus = cartao_sus;
    }

    /**
     * @description Seta código identicador.
     * @param nome_da_mae - Código identicador.
     */
    public setNomeDaMae(nome_da_mae: string): void {
        this.nome_da_mae = nome_da_mae;
    }

    /**
     * @description Seta código identicador.
     * @param municipio_de_nacimento - Código identicador.
     */
    public setMunicipioDeNacimento(municipio_de_nacimento: string): void {
        this.municipio_de_nacimento = municipio_de_nacimento;
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
    * @param endereco - Código identicador.
    */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
    * @description Seta código identicador.
    * @param nome_do_pai - Código identicador.
    */
    public setNomeDoPai(nome_do_pai: string): void {
        this.nome_do_pai = nome_do_pai;
    }

    /**
    * @description Seta código identicador.
    * @param sexo - Código identicador.
    */
    public setSexo(sexo: string): void {
        this.sexo = sexo;
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
    * @param data_nacimento - Código identicador.
    */
    public setDataNacimento(data_nacimento: Date): void {
        this.data_nacimento = data_nacimento;
    }

    /**
    * @description Seta código identicador.
    * @param senha - Código identicador.
    */
    public setSenha(senha: string): void {
        this.senha = senha;
    }

}