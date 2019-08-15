import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-ads',
  templateUrl: './cadastrar-ads.component.html',
  styleUrls: ['./cadastrar-ads.component.css']
})
export class CadastrarAdsComponent implements OnInit {

  private inputCpfAgente: number;
  private inputNameAgente: string;
  private inputSenhaAgente: number; //preciso tratar que so posso adicionar a senha ao banco quando senha e confirmar senhar for igual
  private inputConfirmaSenhaAgente: number;
  private inputRgAgente: number;

  
    /**
     * @constructor
     * @param {number } inputCpfAgente  
     * @param {string } inputNameAgente 
     * @param {number } inputSenhaAgente
     * @param {number } inputConfirmaSenhaAgente
     * @param {number } inputRgAgente
     */
  constructor(inputCpfAgente?: number, inputNameAgente?: string, inputSenhaAgente?: number,
    inputConfirmaSenhaAgente?: number, inputRgAgente?: number) {

    this.inputCpfAgente = inputCpfAgente;
    this.inputNameAgente = inputNameAgente;
    this.inputSenhaAgente = inputSenhaAgente;
    this.inputConfirmaSenhaAgente = inputConfirmaSenhaAgente;
    this.inputRgAgente = inputRgAgente;
  }

  ngOnInit() {
  }

}
