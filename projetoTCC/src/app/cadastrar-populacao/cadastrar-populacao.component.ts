import { Component, OnInit } from '@angular/core';
import { Populacao } from './populacao';

@Component({
  selector: 'app-cadastrar-populacao',
  templateUrl: './cadastrar-populacao.component.html',
  styleUrls: ['./cadastrar-populacao.component.css']
})
export class CadastrarPopulacaoComponent implements OnInit {

  private populacao : Populacao = null;

  constructor() { }

  ngOnInit() {

    this.getCadastrarPopulacao();

  }

  /**
   * @description Retorna instancia de CadastroPopulacao alocado.
   * @return {Populacao} - Instância alocada em memória
   */
  private getCadastrarPopulacao():Populacao{

    if( this.populacao == null ){

      this.populacao = new Populacao();
    }

    return this.populacao;
  }

}
