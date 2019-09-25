import { Component, OnInit } from '@angular/core';
import { Subscription      } from 'rxjs';
import { Ubs } from '../cadastrar-ubs/ubs';
import { AdministradorService } from './administradorService';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {


  private inscricao               = new Subscription ;
  private resultadoApi            = null             ;
  private errosApi                = null             ;
  private administradorUbs: Ubs[] = []               ;
  private pesquisaAdmUbs: String  = ""               ;
  private cnesLogado              = "11111111"       ;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor( private administradorService: AdministradorService ) {

    this.getAllUbs();

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
 getUbsCnes(){
  if(this.pesquisaAdmUbs.trim() == ""){
    
    this.getAllUbs();

  }else{
  console.log(this.pesquisaAdmUbs)
  this.inscricao = this.administradorService.getUbsCnes(this.pesquisaAdmUbs).subscribe(

      result => {
                  this.resultadoApi = result;
                  this.administradorService  = this.resultadoApi.registros;
                  console.log(this.administradorService);
                },
      error => {
                  this.setErrosApi(error);
               }
       );
       console.log("testGet" + this.administradorService)
  }
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
