import { Component, OnInit } from '@angular/core';
import { Subscription        } from 'rxjs';
import { Cartao } from './cartao';
import { CartaoService } from './cartaoService';
import { Router } from '@angular/router';
import { PopulacaoService } from '../cadastrar-populacao/cadastrar-populacao-service.service';

@Component({
  selector: 'app-cartao-populacao',
  templateUrl: './cartao-populacao.component.html',
  styleUrls: ['./cartao-populacao.component.css']
})
export class CartaoPopulacaoComponent implements OnInit {

  private inscricao                                 = new Subscription;
  private resultadoApi                              = null;
  private errosApi                                  = null;
  private vacinasNoCartao  : Cartao[]               = [];
  private nomeLogado                                = this.usuarioPopulacao.getAuth().decodificaToken().nome; //pego o nome do token da pessoa que efetuo o login 
  private cartao_sus_token                          = this.usuarioPopulacao.getAuth().decodificaToken().cartao_sus;// pego o numero do cartao_sus do token da pessoa que efetuo o login
  

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private serviceCartao: CartaoService, 
              private usuarioPopulacao: PopulacaoService, 
              private router: Router) { 

                this.getCartaoDaPopulacao();
              }


  ngOnInit() { }


    /**
  * destruo a inscrição ao fechar.
  */
 ngOnDestroy() {

  this.inscricao.unsubscribe();

}

  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
  *               pela descricao na base de dados.
  */
  getCartaoDaPopulacao() {

    this.serviceCartao.getCartaoDaPopulacao(this.cartao_sus_token).subscribe(

      result => {

        this.resultadoApi = result;
        this.vacinasNoCartao = this.resultadoApi.registros;

        if (this.vacinasNoCartao.length == 0) {

          alert(" Voce não tem vacinas Aplicas ou Agendadas. Visite a Unidade basica mais proxima para Atualizar Seu Cartao.");

        }

      },
      error => {

        this.setErrosApi(error);

      }
    );
    console.log(this.vacinasNoCartao);
  }

  /**
  * @description: Funcão que exclui a chave do Local Storage e chama a home.
  */
  sair() {

    this.usuarioPopulacao.getAuth().logout();
    this.router.navigate(['home']);

  }

  /**
    * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
    *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
    * @param error error ocasionado na aplicação. 
    */
  setErrosApi(error) {

    this.errosApi = error + " /countErros: " + CartaoPopulacaoComponent.countErros++;
    console.log(this.errosApi);

  }
}
