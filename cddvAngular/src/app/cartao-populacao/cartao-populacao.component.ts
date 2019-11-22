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

        if(resultadoApi.length > 0){

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

    let vacinasAplicadas_aux = [];
    let vacinaAplicada      = [];
    let umaVacinaAplicada   = true;

    // Percorre todas as vacinasAplicadas
    for (let index in vacinasAplicadas) {

      
        // Carrega os itens da vacinaAplicada no array
        vacinaAplicada.push(vacinasAplicadas[index]);
      
        // Verifica se próxima posição existe
        if(vacinasAplicadas.length > (Number.parseInt(index) + 1)) {

            //// Verifica se mudou a vacinaAplicada
            //if(vacinasAplicadas[index].emissao != vacinasAplicadas[Number.parseInt(index) + 1].emissao ||
            //vacinasAplicadas[index].hora    != vacinasAplicadas[Number.parseInt(index) + 1].hora    ){

                // Guarda a vacinaAplicada corrente em uma posição especifica da matriz.
                vacinasAplicadas_aux.push(vacinaAplicada);
                console.log("vacinasAplicadas = ", vacinaAplicada);
                vacinaAplicada = [];
                umaVacinaAplicada = false;
        }
    }

    //Tratativa quando for somente uma vacinasAplicadas
    if(umaVacinaAplicada) {

       vacinaAplicada  = [];
       vacinasAplicadas_aux = [];

        for (let index in vacinasAplicadas) {
          vacinaAplicada.push(vacinasAplicadas[index]);
        }
        vacinasAplicadas_aux.push(vacinaAplicada);
        console.log("Há somente uma Vacina", vacinasAplicadas_aux)

    }else{
      // Se não tiver somente um vacinaAplicada, eu pego a ultima que não entrou no if e verifico se mudou
      vacinasAplicadas_aux.push(vacinaAplicada);
    }
    console.log("vacinasAplicadas_aux", vacinasAplicadas_aux);


    // Inicia impressão relatorio
    for(let index in vacinasAplicadas_aux) {

      this.imprimeCabecalho(documento, vacinasAplicadas_aux[index][0]);
      this.imprimeCabecalhoItens(documento);
      this.imprimeItens(documento, vacinasAplicadas_aux[index]);
      this.imprimeRodape(documento, vacinasAplicadas_aux[index][0]);

      if(Number.parseInt(index)+1 < vacinasAplicadas_aux.length){
        documento.addPage();
      }
    }
    console.log("vacinasAplicadas_aux = ", vacinasAplicadas_aux);
  }
  
  /**
   * @description: Imprime o cabeçalho do relatório
   * @param {jsPDF} documento, intancia do pdf a qual será trabalhada.
   * @param {*} vacinaAplicada
   */
  private imprimeCabecalho(documento, vacinaAplicada) {

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
