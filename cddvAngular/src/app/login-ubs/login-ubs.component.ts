import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

import { UbsService } from '../cadastrar-ubs/cadastrarUbsService';

@Component({
  selector: 'app-login-ubs',
  templateUrl: './login-ubs.component.html',
  styleUrls: ['./login-ubs.component.css']
})
export class LoginUbsComponent implements OnInit {

  private userUbs  :String     = "";
  private senha    :String     = "";
  private erro     :String     = null;

  constructor(private usuarioUbs:UbsService,
    private router: Router) { }

  ngOnInit() {  }


  /**
   * @description: adiciona caracteres pertencentes a mascara do cnes, de forma automatica.
   * @param {String} cnes - número do cnes da Ubs 
   */
  private formataCnes(cnes:any){
 
    if( isNaN( cnes.charAt(cnes.length - 1) )  ){        
      // retira caracter se não for número
      this.userUbs = this.userUbs.substring(0, this.userUbs.length-1);    
    }//else{
    //   switch(cnes.length){
    //     case 3 : case 7 :
    //       this.userUbs += "."
    //     break;                              verificar se nessesito disso
    //     case 11 :
    //       this.userUbs +="-"
    //     break;
    //   }
    //}
    this.erro = null;
  }


  /**
   * @description Envia solicitação de login da Ubs para o serviçe
   */
  private loginUbs(){

    let cnes:String;
    let resultApi = null;

    // //retira os caracteres especiais
    // cnes = this.userUbs.substring(0,3) 
    //     + this.userUbs.substring(4,7)
    //     + this.userUbs.substring(8,11) 
    //     + this.userUbs.substring(12,14);

    this.usuarioUbs.getAuth().loginUbs(cnes, this.senha)
                          .subscribe(
                                        result =>{ 
                                                    this.erro = null;
                                                    resultApi = result;

                                                    if(resultApi.auth){

                                                      console.log(" usuario UBS " + cnes + " logado ");
                                                      this.usuarioUbs.getAuth().salvaToken(resultApi.token);
                                                      this.router.navigate(['/']);
                                                    }
                                                  },
                                        erros => { 
                                                    this.erro = erros;
                                                  }
                                      );
    
  }

}
