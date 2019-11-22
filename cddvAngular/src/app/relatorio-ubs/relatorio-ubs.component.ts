import { Component, OnInit } from '@angular/core';

import * as jsPDF from 'jspdf'

/**
* @description Componente fornece o relatório de vistorias realizadas de um determinado formulário.
* @see http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jspdf.js.html
*/

@Component({
  selector: 'app-relatorio-ubs',
  templateUrl: './relatorio-ubs.component.html',
  styleUrls: ['./relatorio-ubs.component.css']
})
export class RelatorioUbsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  private dataDasVacinas ;

  private geraRelatorio() {

    let resultadoApi = null;

    //declarção da intancia do pdf 
    let documento = new jsPDF({

      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    //------------------------------------------------------
    // VALIDANDO INFORMAÇÕES
    //------------------------------------------------------
    if( this.dataDasVacinas == undefined || this.dataDasVacinas == null ){ 

     alert("Informe a data das Vacinas que quer no relatorio!")
     return;
    }else{
      
    }


  }

}
