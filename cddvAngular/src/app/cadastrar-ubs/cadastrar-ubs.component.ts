import { Component, OnInit } from '@angular/core';
import { Ubs } from './ubs';

@Component({
  selector: 'app-cadastrar-ubs',
  templateUrl: './cadastrar-ubs.component.html',
  styleUrls: ['./cadastrar-ubs.component.css']
})
export class CadastrarUbsComponent implements OnInit {

  private ubs : Ubs = null

  constructor() { }

  ngOnInit() {

    this.getCadastrarUbs();

  }

  /**
   * @description Retorna instancia de CadastroUbs alocado.
   * @return {Ubs} - Instância alocada em memória
   */
  private getCadastrarUbs():Ubs{

    if( this.ubs == null ){

      this.ubs = new Ubs();
    }

    return this.ubs;
  }

}
