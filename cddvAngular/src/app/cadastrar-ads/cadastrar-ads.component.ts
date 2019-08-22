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
  private SIZE_CPF = 11;
  private SIZE_NOME = 50;
  private SIZE_SENHA = 30;
  private SIZE_rg = 10;

  private inscricao = new Subscription;
  private agente: Agente = null;
  private confirmaSenha: string;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;


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
   * @description Função valida se informações do formulário estão corretas. Vê se o que está sendo feito
   *              é atualização ou salvamento de um novo registro e chama a função responsável pela ação.
   */
  private salva(){

    if( this.isEmpty() ){

      this.camposObrigatorios = true;
      return;

    }else{

      this.camposObrigatorios = false;
    }

    if(this.agente.cpf){
      
      //this.atualizaFrequencia();
    }else{
      
      this.salvaFrequencia()
    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaFrequencia(){
   
    this.agenteService.salvaAgente(this.agente)
                          .subscribe( 
                                        result =>{ 
                                                    alert("deu certo salvamento");
                                                    this.agente = new Agente();
                                                 },
                                        erros => { 
                                                   //this.setErrosApi(erros);
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

  private registrar() {
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


}
