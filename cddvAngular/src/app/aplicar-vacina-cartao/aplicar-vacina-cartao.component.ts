import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AplicarVacinaService } from './aplicar-vacina.service';
import { AplicadaVacinaCartao } from './aplicar-vacina-cartao';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aplicar-vacina-cartao',
  templateUrl: './aplicar-vacina-cartao.component.html',
  styleUrls: ['./aplicar-vacina-cartao.component.css']
})
export class AplicarVacinaCartaoComponent {

  //TAMANHO DOS CAMPOS 
  public SIZE_CARTAO_SUS             = 15;
  public SIZE_ID_VACINA              = 2;
  public SIZE_CPF_AGENTE             = 11;

  private inscricao = new Subscription;
  private aplicarVacina: AplicadaVacinaCartao = null;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
    private aplicarVacinaService: AplicarVacinaService,
    private route: ActivatedRoute) {

    this.aplicarVacina = new AplicadaVacinaCartao();
  }

  /**
 * Destruo o registro ao finalizar
 */
  ngOnDestroy() {

    this.inscricao.unsubscribe();
  }

    /**
   * @description Função valida se as informações estão corretas do estão corretas. 
   */
  private registrarVacina(){

    if( this.validarCampus() ){

      this.camposObrigatorios = true;
      console.log(this);
      alert("prencha todos os Campos");
      return;

    }else{
      this.camposObrigatorios = false;
      this.salvaAplicarVacina()
    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaAplicarVacina(){
   console.log(this.getAplicadaVacinaCartao());
    this.aplicarVacinaService.salvaAplicarVacinas(this.getAplicadaVacinaCartao())
                          .subscribe( 
                                        result =>{ 
                                                    alert("Registrado com Sucesso");
                                                    this.aplicarVacina = new AplicadaVacinaCartao();
                                                 }
                                     );

    
  }

  /**
   * @description Retorna instancia de CadastroPopulacao alocado.
   * @return {AplicadaVacinaCartao} - Instância alocada em memória
   */
  private getAplicadaVacinaCartao(): AplicadaVacinaCartao {

    if (this.aplicarVacina == null) {

      this.aplicarVacina = new AplicadaVacinaCartao();
    }

    return this.aplicarVacina;
  }

    /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private validarCampus(){

   return this.getAplicadaVacinaCartao().getCartaoSus()         == undefined ||  
          this.getAplicadaVacinaCartao().getVacinasId()         == undefined ||  
          this.getAplicadaVacinaCartao().getDataAplicacao()     == undefined ||  
          this.getAplicadaVacinaCartao().getAplicada()          == undefined ||  
          this.getAplicadaVacinaCartao().getCpfAgente()         == undefined ||  
          this.getAplicadaVacinaCartao().getDataValidade()      == undefined ||  
          this.getAplicadaVacinaCartao().getCartaoSus().trim()  == ''        ||
          this.getAplicadaVacinaCartao().getVacinasId().trim()  == ''        ||
          this.getAplicadaVacinaCartao().getCpfAgente().trim()  == ''        ||
          this.getAplicadaVacinaCartao().getCartaoSus()         == null      ||  
          this.getAplicadaVacinaCartao().getVacinasId()         == null      ||  
          this.getAplicadaVacinaCartao().getDataAplicacao()     == null      ||
          this.getAplicadaVacinaCartao().getAplicada()          == null      ||
          this.getAplicadaVacinaCartao().getCpfAgente()         == null      ||
          this.getAplicadaVacinaCartao().getDataValidade()      == null      
          ? true : false;
  }

}
