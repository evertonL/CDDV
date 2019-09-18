import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
import { workspaceAds } from './workspaceAds';
import { WorkspaceAdsService } from './workspaceAdsService';

@Component({
  selector: 'app-workspace-ads',
  templateUrl: './workspace-ads.component.html',
  styleUrls: ['./workspace-ads.component.css']
})
export class WorkspaceAdsComponent implements OnInit {

  
  private inscricao                    = new Subscription;
  private resultadoApi                 = null;
  private errosApi                     = null;
  private workspaceAdss: workspaceAds[] = [];
  private pesquisa: String             = "";
  

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private workspaceAdsService: WorkspaceAdsService ) {}


 ngOnInit() { }


 /**
  * destruo a inscrição ao fechar.
  */
 ngOnDestroy(){
   
   this.inscricao.unsubscribe();

 }


  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
  *               pela descricao na base de dados.
  */  
 getCartaoDaPopulacao(){

   if(this.pesquisa.trim() == ""){

       alert("Usuario não Encontrado! Verifique o numero digitado.")

   }else{

       this.workspaceAdsService.getCartaoDaPopulacao(this.pesquisa).subscribe(

               result => {
                           this.resultadoApi = result;
                           this.workspaceAdss  = this.resultadoApi.registros; 
                         },
               error => {
                           this.setErrosApi(error);
                        }
       );
       
   }
 }

 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + WorkspaceAdsComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
