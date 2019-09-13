import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
import { Agente } from '../cadastrar-ads/agente';
import { WorkspaceUbsService } from './workspace-ubs.service';

@Component({
  selector: 'app-workspace-ubs',
  templateUrl: './workspace-ubs.component.html',
  styleUrls: ['./workspace-ubs.component.css']
})
export class WorkspaceUbsComponent implements OnInit {

  private inscricao              = new Subscription;
  private resultadoApi           = null;
  private errosApi               = null;
  private workspaceUbss: Agente[] = [];
  private paginaAtual   = 1;   
  private pesquisa: String       = "";
  private cnesPesquisa           = "9999999";

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private workspaceUbsService: WorkspaceUbsService ) {

    this.getAllAdsPorUbs();

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
  
   this.inscricao = this.workspaceUbsService.getAllAdsPorUbs(this.cnesPesquisa).subscribe(

       result => {
                   this.resultadoApi = result;
                   this.workspaceUbss  = this.resultadoApi.registros;        
                 },
       error => {
                   this.setErrosApi(error);
                }

   );
   console.log("test" + this.workspaceUbss)
 }

 
 /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
  *               pela descricao na base de dados.
  */  
 getAgentePeloNome(){

   if(this.pesquisa.trim() == ""){
     console.log("aqui1");
       this.getAllAdsPorUbs();

   }else{

       this.workspaceUbsService.getAgentePeloNome(this.pesquisa).subscribe(

               result => {
                           this.resultadoApi = result;
                           this.workspaceUbss  = this.resultadoApi.registros;        
                         },
               error => {
                           this.setErrosApi(error);
                        }
       );
       console.log("aqui3" + this.workspaceUbsService);
   }
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
