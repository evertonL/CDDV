import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

import { AgenteService } from '../cadastrar-ads/cadastrarAdsService';

@Component({
  selector: 'app-login-ads',
  templateUrl: './login-ads.component.html',
  styleUrls: ['./login-ads.component.css']
})
export class LoginAdsComponent implements OnInit {

  private userAds  :String     = "";
  private senha    :String     = "";
  private erro     :String     = null;

  constructor(private usuarioAds: AgenteService,
              private router: Router) { }

  ngOnInit() { }

    /**
   * @description: adiciona caracteres pertencentes a mascara do cnes, de forma automatica.
   * @param {String} cpf - número do cnes da Ubs 
   */
  private formataCpf(cpf:any){
 
    if( isNaN( cpf.charAt(cpf.length - 1) )  ){        
      // retira caracter se não for número
      this.userAds = this.userAds.substring(0, this.userAds.length-1);    
    }//else{
    //   switch(cnes.length){
    //     case 3 : case 7 :
    //       this.userAds += "."
    //     break;                              verificar se nessesito disso
    //     case 11 :
    //       this.userAds +="-"
    //     break;
    //   }
    //}
    this.erro = null;
  }

    /**
   * @description Envia solicitação de login da Ubs para o serviçe
   */
  private loginAds(){

    let resultApi = null;

    // //retira os caracteres especiais
    // cnes = this.userUbs.substring(0,3) 
    //     + this.userUbs.substring(4,7)
    //     + this.userUbs.substring(8,11) 
    //     + this.userUbs.substring(12,14);

    this.usuarioAds.getAuth().loginAds(this.userAds, this.senha)
                          .subscribe(
                                        result =>{ 
                                                    this.erro = null;
                                                    resultApi = result;
                                                    console.log('token',resultApi)
                                                    if(resultApi.auth){

                                                      console.log(" usuario UBS " + this.userAds + " logado ");
                                                      this.usuarioAds.getAuth().salvaToken(resultApi.token);
                                                      this.router.navigate(['workspace-ads']);
                                                    }
                                                  },
                                        erros => { 
                                                    this.erro = erros;
                                                    console.log('test',erros)
                                                  }
                                      );
    
  }

}
