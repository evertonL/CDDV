import { Component, OnInit } from '@angular/core';
import { Agente } from './agente';
import { Router, ActivatedRoute } from '@angular/router';
import { AgenteService } from './cadastrarAdsService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastrar-ads',
  templateUrl: './cadastrar-ads.component.html',
  styleUrls: ['./cadastrar-ads.component.css']
})
export class CadastrarAdsComponent implements OnInit {

  //TAMANHO DOS CAMPOS 
  public SIZE_CPF = 11;
  public SIZE_NOME = 50;
  public SIZE_SENHA = 30;
  public SIZE_RG = 10;

  private inscricao = new Subscription;
  private agente: Agente = null;
  private confirmaSenha: string;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
    private agenteService: AgenteService,
    private route: ActivatedRoute) {

    this.agente = new Agente();
  }


  ngOnInit() {

    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {

        this.agente.cpf = queryParams['cpf'];
        this.agente.nome = queryParams['nome'];
        this.agente.senha = queryParams['senha'];
        this.agente.rg = queryParams['rg'];

      }
    );

  }

  /**
 * Destruo a inscrição ao finalizar
 */
  ngOnDestroy() {

    this.inscricao.unsubscribe();
  }

    /**
   * @description Função valida se informações do formulário estão corretas. 
   */
  private registrar(){

    if( this.isEmpty() ){

      this.camposObrigatorios = true;
      alert("prencha todos os Campos");
      return;

    }else if(this.agente.senha != this.confirmaSenha){
      alert("As senhas não são iguais");
    }else{
      this.camposObrigatorios = false;
      this.salvaAgente()
    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaAgente(){
   
    this.agenteService.salvaAgente(this.agente)
                          .subscribe( 
                                        result =>{ 
                                                    alert("Registrado com Sucesso");
                                                    this.agente = new Agente();
                                                 }
                                     );

    
  }

  /**
   * @description Retorna instancia de CadastroAgente alocado.
   * @return {Agente} - Instância alocada em memória
   */
  private getCadastrarAds(): Agente {

    if (this.agente == null) {

      this.agente = new Agente();
    }

    return this.agente;
  }

  private registrar1() {
    console.log(this.getCadastrarAds());
  }

    /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private isEmpty(){

    return this.agente.getCpfAgente() == undefined ||  this.agente.getNameAgente() == undefined ||  this.agente.getSenha() == undefined ||  this.agente.getRgAgente() == undefined ||
           this.agente.getCpfAgente() == null  ||  this.agente.getNameAgente() == null  ||  this.agente.getSenha() == null  ||  this.agente.getRgAgente() == null  
            ? true : false;
  }
  
  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-erros
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.mensagemAviso = null;
    this.errosApi = error + " /countErros: " + CadastrarAdsComponent.countErros++  ;
    console.log(this.errosApi);
  }


}
