import { Component, OnInit } from '@angular/core';
import { Agente } from './agente';

@Component({
  selector: 'app-cadastrar-ads',
  templateUrl: './cadastrar-ads.component.html',
  styleUrls: ['./cadastrar-ads.component.css']
})
export class CadastrarAdsComponent implements OnInit {

  private agente: Agente = null;
  private confirmaSenha : string ;

  constructor() {}

  ngOnInit() {

    this.getCadastrarAds();
    
  }

  /**
   * @description Retorna instancia de CadastroAgente alocado.
   * @return {Agente} - Instância alocada em memória
   */
  private getCadastrarAds():Agente{

    if( this.agente == null ){

      this.agente = new Agente();
    }

    return this.agente;
  }

  private registrar(){
    console.log(this.getCadastrarAds());
  }

}
