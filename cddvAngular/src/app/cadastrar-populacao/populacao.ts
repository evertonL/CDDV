/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO DE POPULACÃO
 */
export class Populacao {

    private cartao_sus              : String;
    private nome_da_mae             : String;
    private municipio_de_nacimento  : String;
    private estado                  : String;
    private endereco                : String
    private nome_do_pai             : String;
    private sexo                    : String;
    private nome                    : String;
    private data_nacimento          : Date;
    private senha                   : String;

    /**
     * @constructor
     * @param {String } cartao_sus            
     * @param {String } nome_da_mae            
     * @param {String } municipio_de_nacimento 
     * @param {String } estado
     * @param {String } endereco                 
     * @param {String } nome_do_pai            
     * @param {String } sexo                   
     * @param {String } nome                   
     * @param {Date   } data_nacimento         
     * @param {String } senha                  
     */
    constructor(cartao_sus?: String, nome_da_mae?: String, municipio_de_nacimento?: String,
        estado?: String, endereco?: String, nome_do_pai?: String,
        sexo?: String, nome?: String,
        data_nacimento?: Date, senha?: String) {

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
    * @return {String} ( cartao_sus ) - código identificador.
    */
    public getCartaoSus(): String {
        return this.cartao_sus;
    }

    /**
     * @description: Retorna o nome_da_mae.
     * @return {String} ( nome_da_mae ) - código identificador.
     */
    public getNomeDaMae(): String {
        return this.nome_da_mae;
    }

    /**
     * @description: Retorna a municipio_de_nacimento
     * @return {String} ( municipio_de_nacimento ) - código identificador.
     */
    public getMunicipioDeNacimento(): String {
        return this.municipio_de_nacimento;
    }

    /**
     * @description: Retorna o estado
     * @return {String} ( estado ) - código identificador.
     */
    public getEstado(): String {
        return this.estado;
    }

    /**
     * @description: Retorna o estado
     * @return {String} ( endereco ) - código identificador.
     */
    public getEndereco(): String {
        return this.endereco;
    }

    /**
     * @description: Retorna o nome_do_pai
     * @return {String} ( nome_do_pai ) - código identificador.
     */
    public getNomeDoPai(): String {
        return this.nome_do_pai;
    }

    /**
     * @description: Retorna o sexo
     * @return {String} ( sexo ) - código identificador.
     */
    public getSexo(): String {
        return this.sexo;
    }

    /**
     * @description: Retorna o nome
     * @return {String} ( nome ) - código identificador.
     */
    public getNome(): String {
        return this.nome;
    }

    /**
     * @description: Retorna o data_nacimento
     * @return {String} ( data_nacimento ) - código identificador.
     */
    public getDataNacimento(): Date {
        return this.data_nacimento;
    }

    /**
     * @description: Retorna o senha
     * @return {String} ( senha ) - código identificador.
     */
    public getSenha(): String {
        return this.senha;
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
     * @param nome_da_mae - Código identicador.
     */
    public setNomeDaMae(nome_da_mae: String): void {
        this.nome_da_mae = nome_da_mae;
    }

    /**
     * @description Seta código identicador.
     * @param municipio_de_nacimento - Código identicador.
     */
    public setMunicipioDeNacimento(municipio_de_nacimento: String): void {
        this.municipio_de_nacimento = municipio_de_nacimento;
    }

    /**
    * @description Seta código identicador.
    * @param estado - Código identicador.
    */
    public setEstado(estado: String): void {
        this.estado = estado;
    }

    /**
    * @description Seta código identicador.
    * @param endereco - Código identicador.
    */
    public setEndereco(endereco: String): void {
        this.endereco = endereco;
    }

    /**
    * @description Seta código identicador.
    * @param nome_do_pai - Código identicador.
    */
    public setNomeDoPai(nome_do_pai: String): void {
        this.nome_do_pai = nome_do_pai;
    }

    /**
    * @description Seta código identicador.
    * @param sexo - Código identicador.
    */
    public setSexo(sexo: String): void {
        this.sexo = sexo;
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
    * @param data_nacimento - Código identicador.
    */
    public setDataNacimento(data_nacimento: Date): void {
        this.data_nacimento = data_nacimento;
    }

    /**
    * @description Seta código identicador.
    * @param senha - Código identicador.
    */
    public setSenha(senha: String): void {
        this.senha = senha;
    }

}