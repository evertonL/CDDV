import { Component, OnInit } from '@angular/core';
import { Subscription          } from 'rxjs';
import { WorkspaceUbsService   } from './workspace-ubs.service';
import { Vacina                } from '../cadastrar-vacina/vacina';
import { Agente                } from '../cadastrar-ads/agente';
import { UbsService            } from '../cadastrar-ubs/cadastrarUbsService';
import { Router,ActivatedRoute } from '@angular/router';
import { PopulacaoService } from '../cadastrar-populacao/cadastrar-populacao-service.service';

@Component({
  selector: 'app-workspace-ubs',
  templateUrl: './workspace-ubs.component.html',
  styleUrls: ['./workspace-ubs.component.css']
})
export class WorkspaceUbsComponent implements OnInit {

  private inscricao                     = new Subscription;
  private resultadoApi                  = null;
  private errosApi                      = null;
  private workspaceUbsAgentes: Agente[] = [];
  private workspaceUbsVacinas: Vacina[] = [];
  private pesquisaAgente     : String   = "";
  private pesquisaVacina     : String   = "";
  private cnesLogado                    ;//= this.usuario.getAuth().decodificaToken().cnes; //pego o cnes do token da ubs que efetuo o login
  private nomeUbsLogado                 ;//= this.usuario.getAuth().decodificaToken().nome_da_unidade;
  private adiministrador                = this.usuarioADM.getAuth().decodificaToken().cartao_sus;
  private auxiliarNome;
  private auxiliarCnes;
  private atualizandoVacina  : boolean  = true; //tenho que arrumar esta vindo como indefinido
  
  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private workspaceUbsService: WorkspaceUbsService ,
               private usuario: UbsService,
               private usuarioADM: PopulacaoService, 
               private router: Router,
               private route : ActivatedRoute) { }


 ngOnInit() {
   
  if(this.adiministrador == '0'){

    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
  
        //this.cnesLogado = queryParams['cnes'];
        this.setCnes(queryParams['cnes'])
        console.log("TENtei",this.cnesLogado)
        this.setNomeLogado(queryParams['nome'])

        	
         sessionStorage.setItem("ADMusuario", this.cnesLogado);
         sessionStorage.setItem("ADMnome", this.nomeUbsLogado);

        console.log("auxiliarCnes "+ this.auxiliarCnes);
      }
    );

    this.getAllAdsPorUbs();
    this.getAllVacinasPorUbs();

  }else{
  
  this.cnesLogado = this.usuario.getAuth().decodificaToken().cnes;
  this.nomeUbsLogado = this.usuario.getAuth().decodificaToken().nome_da_unidade;

  this.getAllAdsPorUbs();
  this.getAllVacinasPorUbs();
  }

 }

 


 /**
  * destruo a inscrição ao fechar.
  */
 ngOnDestroy(){
   
   this.inscricao.unsubscribe();

 }


 /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todos os agentes na base de dados.
  */
 getAllAdsPorUbs(){
  
   this.inscricao = this.workspaceUbsService.getAllAdsPorUbs(this.cnesLogado).subscribe(
     
       result => {
                   this.resultadoApi = result;
                   this.workspaceUbsAgentes  = this.resultadoApi.registros;
                   console.log('ads',this.cnesLogado)
                 },
       error => {
                   this.setErrosApi(error);
                }
   );
   console.log("test" + this.workspaceUbsAgentes)
 }

 /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todos as vacinas na base de dados.
  */
 getAllVacinasPorUbs(){
  
  this.inscricao = this.workspaceUbsService.getAllVacinasPorUbs(this.cnesLogado).subscribe(

      result => {
                  this.resultadoApi = result;
                  this.workspaceUbsVacinas  = this.resultadoApi.registros;
                     
                },
      error => {
                  this.setErrosApi(error);
               }
  );
  console.log("test" + this.workspaceUbsVacinas)
}

 /**
  * @description: Funcão que exclui a chave do Local Storage e chama a home.
  */
 sair(){
   this.usuario.getAuth().logout();
   this.router.navigate(['home']);
}

 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + WorkspaceUbsComponent.countErros++  ;
    console.log(this.errosApi);
  }

  /**
     * @description Seta código identicador.
     * @param cnes - Código identicador.
     */
    public setCnes(cnes: String): void {
      this.cnesLogado = cnes;
    }
  
  /**
   * @description Seta código identicador.
   * @param cnes - Código identicador.
   */
  public setNomeLogado(nome: String): void {
    this.nomeUbsLogado = nome;
  }

}
