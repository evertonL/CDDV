import { Component, OnInit } from '@angular/core';
import { Subscription        } from 'rxjs';
import { Cartao } from './cartao';
import { CartaoService } from './cartaoService';
import { Router } from '@angular/router';
import { PopulacaoService } from '../cadastrar-populacao/cadastrar-populacao-service.service';

import * as jsPDF from 'jspdf'

/**
* @description Componente fornece o relatório de vacinasAplicadas realizadas de um determinado formulário.
* @see http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jspdf.js.html
*/

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



  private imprimirCartao(){

    let resultadoApi = null;

    //declarção da intancia do pdf 
    let documento = new jsPDF({

      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    this.serviceCartao.getCartaoDaPopulacao(this.cartao_sus_token).subscribe(

      result => {

        resultadoApi = result;
        console.log("t" + resultadoApi)
        if(resultadoApi.linhas_afetadas > 0){

            this.processaInformacoesDoCartao(documento, resultadoApi.registros);
            documento.output("dataurlnewwindow");

        }else{
          alert(" Voce não tem vacinas Aplicas. Visite a Unidade basica mais proxima para Atualizar Seu Cartao.");
        }

      },
      error => {

        this.setErrosApi(error);

      }
    );
    console.log(this.vacinasNoCartao);
  }

  /**
   * @description: processar as informacoes que vem da api.
   * @param {jsPDF} documento, intancia do pdf a qual será trabalhada.
   * @param {*} vacinasAplicadas, resultset da consulta realizada no banco de dados com as vacinasAplicadas
   */
  private processaInformacoesDoCartao(documento, vacinasAplicadas) {

    // Inicia impressão relatorio
    for(let index in vacinasAplicadas) {

      this.imprimeCabecalho(documento, vacinasAplicadas[index][0]);
      this.imprimeCabecalhoItens(documento);
      this.imprimeItens(documento, vacinasAplicadas[index]);
      this.imprimeRodape(documento, vacinasAplicadas[index][0]);
    }
    console.log("vacinasAplicadas_aux = ", vacinasAplicadas);
  }
  
  /**
   * @description: Imprime o cabeçalho do relatório
   * @param {jsPDF} documento, intancia do pdf a qual será trabalhada.
   * @param {*} vacinaAplicada
   */
  private imprimeCabecalho(documento, vacinaAplicada) {

     // FAZENDO EM LINHAS HORIZONTAIS
    //documento.rect( 0,  0,  50, 32, "S");
    //documento.line(0,  8, 210,  8, 'S');
    //documento.line(0, 16, 210, 16, 'S');
    documento.line(0, 22, 210, 22, 'S');
    documento.line(0, 34, 210, 34, 'S');
    documento.line(0, 60, 210, 60 ,'S');
    documento.line(0, 75, 210, 75 ,'S');


    documento.setFont("Roman");
    documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text("Cartão de Vacinas", 75, 13);
    documento.text("Vacinas", 90, 50);
    documento.setFontSize(12);

    // TEXTOS FIXOS
    documento.setFontStyle("normal");
    documento.text("Nome :",  15, 30);
    documento.text("Nome da Vacina",  10, 70);
    documento.text("Lote ",  50, 70);
    documento.text("Responsavel",  90, 70);
    documento.text("UBS" , 140, 70);
    documento.text("Validade"  , 180, 70);

    documento.rect( 0,  75,  47, 12, "S");
    documento.rect( 47, 75,  30, 12, "S");
    documento.rect( 77, 75,  47, 12, "S");
    documento.rect( 124,75,  47, 12, "S");
    documento.rect( 171,75,  47, 12, "S");

    documento.rect( 0,  87,  47, 12, "S");
    documento.rect( 47, 87,  30, 12, "S");
    documento.rect( 77, 87,  47, 12, "S");
    documento.rect( 124,87,  47, 12, "S");
    documento.rect( 171,87,  47, 12, "S");

    documento.rect( 0,  99,  47, 12, "S");
    documento.rect( 47, 99,  30, 12, "S");
    documento.rect( 77, 99,  47, 12, "S");
    documento.rect( 124,99,  47, 12, "S");
    documento.rect( 171,99,  47, 12, "S");

    documento.rect( 0,  111,  47, 12, "S");
    documento.rect( 47, 111,  30, 12, "S");
    documento.rect( 77, 111,  47, 12, "S");
    documento.rect( 124,111,  47, 12, "S");
    documento.rect( 171,111,  47, 12, "S");

    documento.rect( 0,  123,  47, 12, "S");
    documento.rect( 47, 123,  30, 12, "S");
    documento.rect( 77, 123,  47, 12, "S");
    documento.rect( 124,123,  47, 12, "S");
    documento.rect( 171,123,  47, 12, "S");

    documento.rect( 0,  135,  47, 12, "S");
    documento.rect( 47, 135,  30, 12, "S");
    documento.rect( 77, 135,  47, 12, "S");
    documento.rect( 124,135,  47, 12, "S");
    documento.rect( 171,135,  47, 12, "S");

    documento.rect( 0,  147,  47, 12, "S");
    documento.rect( 47, 147,  30, 12, "S");
    documento.rect( 77, 147,  47, 12, "S");
    documento.rect( 124,147,  47, 12, "S");
    documento.rect( 171,147,  47, 12, "S");

    documento.rect( 0,  159,  47, 12, "S");
    documento.rect( 47, 159,  30, 12, "S");
    documento.rect( 77, 159,  47, 12, "S");
    documento.rect( 124,159,  47, 12, "S");
    documento.rect( 171,159,  47, 12, "S");

    documento.rect( 0,  171,  47, 12, "S");
    documento.rect( 47, 171,  30, 12, "S");
    documento.rect( 77, 171,  47, 12, "S");
    documento.rect( 124,171,  47, 12, "S");
    documento.rect( 171,171,  47, 12, "S");

    documento.rect( 0,  183,  47, 12, "S");
    documento.rect( 47, 183,  30, 12, "S");
    documento.rect( 77, 183,  47, 12, "S");
    documento.rect( 124,183,  47, 12, "S");
    documento.rect( 171,183,  47, 12, "S");

    documento.rect( 0,  195,  47, 12, "S");
    documento.rect( 47, 195,  30, 12, "S");
    documento.rect( 77, 195,  47, 12, "S");
    documento.rect( 124,195,  47, 12, "S");
    documento.rect( 171,195,  47, 12, "S");

    documento.rect( 0,  207,  47, 12, "S");
    documento.rect( 47, 207,  30, 12, "S");
    documento.rect( 77, 207,  47, 12, "S");
    documento.rect( 124,207,  47, 12, "S");
    documento.rect( 171,207,  47, 12, "S");

    documento.rect( 0,  219,  47, 12, "S");
    documento.rect( 47, 219,  30, 12, "S");
    documento.rect( 77, 219,  47, 12, "S");
    documento.rect( 124,219,  47, 12, "S");
    documento.rect( 171,219,  47, 12, "S");

    documento.rect( 0,  231,  47, 12, "S");
    documento.rect( 47, 231,  30, 12, "S");
    documento.rect( 77, 231,  47, 12, "S");
    documento.rect( 124,231,  47, 12, "S");
    documento.rect( 171,231,  47, 12, "S");

    documento.rect( 0,  243,  47, 12, "S");
    documento.rect( 47, 243,  30, 12, "S");
    documento.rect( 77, 243,  47, 12, "S");
    documento.rect( 124,243,  47, 12, "S");
    documento.rect( 171,243,  47, 12, "S");

    documento.rect( 0,  255,  47, 12, "S");
    documento.rect( 47, 255,  30, 12, "S");
    documento.rect( 77, 255,  47, 12, "S");
    documento.rect( 124,255,  47, 12, "S");
    documento.rect( 171,255,  47, 12, "S");

    documento.rect( 0,  267,  47, 12, "S");
    documento.rect( 47, 267,  30, 12, "S");
    documento.rect( 77, 267,  47, 12, "S");
    documento.rect( 124,267,  47, 12, "S");
    documento.rect( 171,267,  47, 12, "S");

    documento.rect( 0,  279,  47, 12, "S");
    documento.rect( 47, 279,  30, 12, "S");
    documento.rect( 77, 279,  47, 12, "S");
    documento.rect( 124,279,  47, 12, "S");
    documento.rect( 171,279,  47, 12, "S");

    // INFORMAÇÕES DO BD
    documento.text(this.nomeLogado                   , 30, 30);

  }

  /**
   * @description: Imprime o cabeçalho dos itens do relatório.
   * @param documento, intancia do pdf a qual será trabalhada.
   */
  private imprimeCabecalhoItens(documento) {

  }

  /**
   * @description Imprime os itens do relatório
   * @param documento, intancia do pdf a qual será trabalhada.
   * @param vacinaAplicada 
   */
  private imprimeItens(documento, vacinaAplicada) {

  }

  /**
   * @description Imprime o rodapé do relatório
   * @param documento, intancia do pdf a qual será trabalhada.
   */
  private imprimeRodape(documento, vacinaAplicada) {

  }
  
}
