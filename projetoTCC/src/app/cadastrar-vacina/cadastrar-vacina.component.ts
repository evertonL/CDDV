import { Component, OnInit } from '@angular/core';
import { Vacina } from './vacina';

@Component({
  selector: 'app-cadastrar-vacina',
  templateUrl: './cadastrar-vacina.component.html',
  styleUrls: ['./cadastrar-vacina.component.css']
})
export class CadastrarVacinaComponent implements OnInit {

  private vacina : Vacina = null
  
  constructor() { }

  ngOnInit() {

    this.getCadastrarVacina();

  }

  /**
   * @description Retorna instancia de CadastroVaciana alocado.
   * @return {Vacina} - Instância alocada em memória
   */
  private getCadastrarVacina():Vacina{

    if( this.vacina == null ){

      this.vacina = new Vacina();
    }

    return this.vacina;
  }

}
