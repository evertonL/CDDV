import { Component, OnInit } from '@angular/core';
import { Cartao } from './cartao';

@Component({
  selector: 'app-cartao-populacao',
  templateUrl: './cartao-populacao.component.html',
  styleUrls: ['./cartao-populacao.component.css']
})
export class CartaoPopulacaoComponent implements OnInit {

  private cartao : Cartao = null
  
  constructor() { }

  ngOnInit() {

    this.getCadastroNoCartao();

  }

  /**
   * @description Retorna instancia de CadastroDeCartao alocado.
   * @return {Cartao} - Instância alocada em memória
   */
  private getCadastroNoCartao():Cartao{

    if( this.cartao == null ){

      this.cartao = new Cartao();
    }

    return this.cartao;
  }

}
