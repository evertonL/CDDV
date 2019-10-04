import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

import { PopulacaoService } from '../cadastrar-populacao/cadastrar-populacao-service.service';

@Component({
  selector: 'app-login-populacao',
  templateUrl: './login-populacao.component.html',
  styleUrls: ['./login-populacao.component.css']
})
export class LoginPopulacaoComponent implements OnInit {

  private userPopulacao  :String     = "";
  private senha          :String     = "";
  private erro           :String     = null;

  constructor(private usuarioPopulacao: PopulacaoService,
              private router: Router) { }

  ngOnInit() { }

    /**
   * @description: adiciona caracteres pertencentes a mascara do cnes, de forma automatica.
   * @param {String} cartao_sus - número do cartao do sus da pessoa
   */
  private formataCartaoSus(cartao_sus:any){
 
    if( isNaN( cartao_sus.charAt(cartao_sus.length - 1) )  ){        
      // retira caracter se não for número
      this.userPopulacao = this.userPopulacao.substring(0, this.userPopulacao.length-1);    
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
  private loginPopulacao(){

    let resultApi = null;

    // //retira os caracteres especiais
    // cnes = this.userUbs.substring(0,3) 
    //     + this.userUbs.substring(4,7)
    //     + this.userUbs.substring(8,11) 
    //     + this.userUbs.substring(12,14);

    this.usuarioPopulacao.getAuth().loginPopulacao(this.userPopulacao, this.senha)
                          .subscribe(
                                        result =>{ 
                                                    this.erro = null;
                                                    resultApi = result;
                                                    console.log('token',resultApi)
                                                    if(resultApi.auth){

                                                      console.log(" usuario da Populacao " + this.userPopulacao + " logado ");
                                                      this.usuarioPopulacao.getAuth().salvaToken(resultApi.token);
                                                      let numeroCartao = this.usuarioPopulacao.getAuth().decodificaToken().cartao_sus;
                                                      if(numeroCartao == '0'){
                                                        this.router.navigate(['administrador']);
                                                      }else{
                                                        console.log("adm",numeroCartao)
                                                        this.router.navigate(['cartao-populacao']);
                                                      }
                                                    }
                                                  },
                                        erros => { 
                                                    this.erro = erros;
                                                    console.log('test',erros)
                                                  }
                                      );
    
  }

}
