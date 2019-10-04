import { Component, OnInit } from '@angular/core';
import { Agente } from './agente';
import { Router, ActivatedRoute } from '@angular/router';
import { AgenteService } from './cadastrarAdsService';
import { Subscription } from 'rxjs';
import { UbsService } from '../cadastrar-ubs/cadastrarUbsService';

@Component({
  selector: 'app-cadastrar-ads',
  templateUrl: './cadastrar-ads.component.html',
  styleUrls: ['./cadastrar-ads.component.css']
})
export class CadastrarAdsComponent /*implements OnInit*/ {

  //TAMANHO DOS CAMPOS 
  public SIZE_CPF   = 11;
  public SIZE_NOME  = 50;
  public SIZE_SENHA = 30;
  public SIZE_RG    = 10;

  private inscricao = new Subscription;
  private agente: Agente = null;
  private confirmaSenha: String;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;
  private status                  = false;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
    private agenteService: AgenteService,
    private route: ActivatedRoute,
    private ubsUsuario: UbsService) {
    // this.agente = new Agente();
    
    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {

        this.getCadastrarAds().setNameAgente(queryParams['nome']);
        this.getCadastrarAds().setSenha(queryParams['senha']);
        this.getCadastrarAds().setRgAgente(queryParams['rg']);
        this.getCadastrarAds().setCnes(this.ubsUsuario.getAuth().decodificaToken().cnes);
        this.getCadastrarAds().setBloqueado(queryParams['bloqueado']);
        this.getCadastrarAds().setCpfAgente(queryParams['cpf']);
        this.confirmaSenha = this.getCadastrarAds().getSenha();
        this.setStatus(queryParams['verificacao']);

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

      // this.camposObrigatorios = true;
      alert("prencha todos os Campos");
      return;

    }else if(this.getCadastrarAds().getSenha() != this.confirmaSenha){

      alert("As senhas não são iguais")

    }else if(this.getStatus() == undefined){

      // this.camposObrigatorios = false;
      console.log("salva",this.status)
      this.salvaAgente()
      
    }else{
      console.log("atulizar",this.status)
      this.atualizarAgente()
    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaAgente(){

   console.log(this.getCadastrarAds());
   
    this.agenteService.salvaAgente(this.getCadastrarAds())
                          .subscribe( 
                                        result =>{ 
                                                    alert("Registrado com Sucesso");
                                                    this.agente = new Agente();
                                                    this.confirmaSenha = '';
                                                    this.router.navigate(['workspace-ubs']);
                                                 }
                                     );

    
  }

    /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private atualizarAgente(){

    // this.getCadastrarAds().setBloqueado(true);
    console.log(this.getCadastrarAds());
    
     this.agenteService.atualizarAgente(this.getCadastrarAds())
                           .subscribe( 
                                         result =>{ 
                                                     this.agente = new Agente();
                                                     this.confirmaSenha = '';
                                                     this.router.navigate(['workspace-ubs']);
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
  private validarCampus(){

    return this.getCadastrarAds().getCpfAgente()  == undefined  ||
           this.getCadastrarAds().getNameAgente() == undefined  ||
           this.getCadastrarAds().getSenha()      == undefined  ||  
           this.getCadastrarAds().getRgAgente()   == undefined  ||
           this.getCadastrarAds().getBloqueado()  == undefined  ||
           this.confirmaSenha                     == undefined  ||
           this.getCadastrarAds().getCpfAgente()  == ''         ||            
           this.getCadastrarAds().getNameAgente() == ''         || 
           this.getCadastrarAds().getSenha()      == ''         || 
           this.getCadastrarAds().getRgAgente()   == ''         ||
           this.confirmaSenha                     == ''         || 
           this.getCadastrarAds().getCpfAgente()  == null       ||  
           this.getCadastrarAds().getNameAgente() == null       ||  
           this.getCadastrarAds().getSenha()      == null       ||  
           this.getCadastrarAds().getRgAgente()   == null       ||
           this.getCadastrarAds().getBloqueado()  == null       ||
           this.confirmaSenha                     == null  
            ? true : false;
  }

  public getStatus(){
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

}