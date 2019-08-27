import { Component, OnInit } from '@angular/core';
import { Ubs } from './ubs';
import { Router, ActivatedRoute } from '@angular/router';
import { UbsService } from './cadastrarUbsService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastrar-ubs',
  templateUrl: './cadastrar-ubs.component.html',
  styleUrls: ['./cadastrar-ubs.component.css']
})

export class CadastrarUbsComponent implements OnInit {

  //TAMANHO DOS CAMPOS 

  public SIZE_CNES            = 7  ;
  public SIZE_NOME_DA_UNIDADE = 60 ;
  public SIZE_MUNICIPIO       = 30 ;
  public SIZE_BAIRRO          = 30 ;
  public SIZE_ENDERECO        = 60 ;
  public SIZE_ESTADO          = 2  ;
  public SIZE_TELEFONE        = 15 ;
  public SIZE_CEP             = 8  ;
  public SIZE_SENHA           = 32 ;

  private inscricao = new Subscription;
  private ubs: Ubs = null;
  private confirmaSenha: string;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
    private ubsService: UbsService,
    private route: ActivatedRoute) {

    this.ubs = new Ubs();
  }


  ngOnInit() {

    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {

        this.ubs.cnes = queryParams['cnes'];
        this.ubs.nome_da_unidade = queryParams['nome_da_unidade'];
        this.ubs.municipio = queryParams['municipio'];
        this.ubs.bairro = queryParams['bairro'];
        this.ubs.endereco = queryParams['endereco'];              
        this.ubs.estado = queryParams['estado'];
        this.ubs.telefone = queryParams['telefone'];
        this.ubs.cep = queryParams['cep'];
        this.ubs.senha = queryParams['senha'];

      }
    );

  }

  /**
 * Destruo o registro ao finalizar
 */
  ngOnDestroy() {

    this.inscricao.unsubscribe();
  }

    /**
   * @description Função valida se informações do formulário estão corretas. 
   */
  private registrar(){

    if( this.validarCampus() ){

      this.camposObrigatorios = true;
      alert("prencha todos os Campos");
      return;

    }else if(this.ubs.senha != this.confirmaSenha){
      alert("As senhas não são iguais");
    }else{
      this.camposObrigatorios = false;
      this.salvaUbs()
    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaUbs(){
   
    this.ubsService.salvaUbs(this.ubs)
                          .subscribe( 
                                        result =>{ 
                                                    alert("Registrado com Sucesso");
                                                    this.ubs = new Ubs();
                                                 }
                                     );

    
  }

  /**
   * @description Retorna instancia de Cadastroubs alocado.
   * @return {ubs} - Instância alocada em memória
   */
  private getCadastrarUbs(): Ubs {

    if (this.ubs == null) {

      this.ubs = new Ubs();
    }

    return this.ubs;
  }

  private registrar1() {
    console.log(this.getCadastrarUbs());
  }

    /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private validarCampus(){

    return this.ubs.getCnes()          == undefined ||  
           this.ubs.getNomeDaUnidade() == undefined ||  
           this.ubs.getMunicipio()     == undefined ||
           this.ubs.getBairro()        == undefined ||
           this.ubs.getEndereco()      == undefined ||
           this.ubs.getEstado()        == undefined ||
           this.ubs.gettelefone()      == undefined ||
           this.ubs.getCep()           == undefined ||
           this.ubs.getSenha()         == undefined ||
           this.ubs.getCnes()          == null  ||  
           this.ubs.getNomeDaUnidade() == null  ||  
           this.ubs.getMunicipio()     == null  ||
           this.ubs.getBairro()        == null  ||
           this.ubs.getEndereco()      == null  ||
           this.ubs.getEstado()        == null  ||
           this.ubs.gettelefone()      == null  ||
           this.ubs.getCep()           == null  ||
           this.ubs.getSenha()         == null  
            ? true : false;
  }
  
  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + CadastrarUbsComponent.countErros++  ;
    console.log(this.errosApi);
  }
}