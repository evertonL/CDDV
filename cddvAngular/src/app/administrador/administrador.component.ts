import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
import { Ubs } from '../cadastrar-ubs/ubs';
import { AdministradorService } from './administradorService';
import { Populacao } from '../cadastrar-populacao/populacao';
import { Agente } from '../cadastrar-ads/agente';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {


  private inscricao                            = new Subscription ;
  private resultadoApi                         = null             ;
  private errosApi                             = null             ;
  private administradorUbs       : Ubs[]       = []               ;
  private administradorAds       : Agente[]    = []               ;
  private administradorPopulacao : Populacao[] = []               ;
  private pesquisaAdmUbs         : String      = ""               ;
  private pesquisaAdmAds         : String      = ""               ;
  private pesquisaAdmPopulacao   : String      = ""               ;


  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private administradorService: AdministradorService ) {

    this.getAllUbs();
    this.getAllAds();
    this.getAllPopulacao();

 }


 ngOnInit() { }


 /**
  * destruo a inscrição ao fechar.
  */
 ngOnDestroy(){
   
   this.inscricao.unsubscribe();

 }


 /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todas as ubs na base de dados.
  */
 getAllUbs(){
  
   this.inscricao = this.administradorService.getAllUbs().subscribe(

       result => {
                   this.resultadoApi = result;
                   this.administradorUbs  = this.resultadoApi.registros;
                      
                 },
       error => {
                   this.setErrosApi(error);
                }
   );
   console.log("testComponent" + this.administradorService)
 }

  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todos os agentes na base de dados.
  */
 getAllAds(){
  
  this.inscricao = this.administradorService.getAllAds().subscribe(

      result => {
                  this.resultadoApi = result;
                  this.administradorAds  = this.resultadoApi.registros;
                     
                },
      error => {
                  this.setErrosApi(error);
               }
  );
  console.log("testComponent" + this.administradorService)
}

  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todos os agentes na base de dados.
  */
 getAllPopulacao(){
  
  this.inscricao = this.administradorService.getAllPopulacao().subscribe(

      result => {
                  this.resultadoApi = result;
                  this.administradorPopulacao  = this.resultadoApi.registros;
                     
                },
      error => {
                  this.setErrosApi(error);
               }
  );
  console.log("testComponent" + this.administradorService)
}

 /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + AdministradorComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
