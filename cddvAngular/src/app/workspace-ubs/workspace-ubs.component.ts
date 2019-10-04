import { Component, OnInit     } from '@angular/core';
import { Subscription          } from 'rxjs';
import { WorkspaceUbsService   } from './workspace-ubs.service';
import { Vacina                } from '../cadastrar-vacina/vacina';
import { Agente                } from '../cadastrar-ads/agente';
import { UbsService            } from '../cadastrar-ubs/cadastrarUbsService';
import { Router,ActivatedRoute } from '@angular/router';

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
  private cnesLogado                    = this.usuario.getAuth().decodificaToken().cnes; //pego o cnes do token da ubs que efetuo o login
  private nomeUbsLogado                 = this.usuario.getAuth().decodificaToken().nome_da_unidade;
  private atualizandoVacina  : boolean  = true; //tenho que arrumar esta vindo como indefinido
  
  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private workspaceUbsService: WorkspaceUbsService ,
               private usuario: UbsService, 
               private router: Router,
               private route : ActivatedRoute) {

    this.getAllAdsPorUbs();
    this.getAllVacinasPorUbs();
    console.log(this.nomeUbsLogado);
    
 }


 ngOnInit() { }


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

 
//  /**
//   * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
//   *               pela descricao na base de dados.
//   */  
//  getAgentePeloNome(){

//    if(this.pesquisa.trim() == ""){
//        this.getAllAdsPorUbs();

//    }else{

//        this.workspaceUbsService.getAgentePeloNome(this.pesquisa,this.cnesLogado).subscribe(

//                result => {
//                            this.resultadoApi = result;
//                            this.workspaceUbsAgentes  = this.resultadoApi.registros; 
//                          },
//                error => {
//                            this.setErrosApi(error);
//                         }
//        );
       
//    }
//  }

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

}
