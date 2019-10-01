import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AplicarVacinaService } from './aplicar-vacina.service';
import { AplicadaVacinaCartao } from './aplicar-vacina-cartao';
import { Subscription } from 'rxjs';
import { Vacina } from '../cadastrar-vacina/vacina';
import { WorkspaceUbsService } from '../workspace-ubs/workspace-ubs.service';
import { AgenteService } from '../cadastrar-ads/cadastrarAdsService';

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

  private inscricao                                   = new Subscription;
  private resultadoApi                                = null;
  private aplicarVacina        : AplicadaVacinaCartao = null;
  private workspaceUbsVacinas  : Vacina[]             = [];
  private camposObrigatorios                          = false;
  private mensagemAviso                               = null;
  private errosApi                                    = null;
  private tipoDaVacina        : String                = null;
  
  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
              private aplicarVacinaService: AplicarVacinaService,
              private workspaceUbsService: WorkspaceUbsService,
              private adsUsuario: AgenteService,
              private route: ActivatedRoute) {

    // this.aplicarVacina = new AplicadaVacinaCartao();
    this.getAllVacinasPorUbs();
  }

  ngOnInit() {

    //Recupera o conteudo dos parametros e inicializa campos.
    //Também resgata a instancia da inscrição.
    this.inscricao = this.route.queryParams.subscribe(
      (queryParams: any) => {
        
        let dataHoje = new Date();

        this.getAplicadaVacinaCartao().setCartaoSus(queryParams['cartao_sus']);
        this.getAplicadaVacinaCartao().setVacinasId(queryParams['vacina_id']);
        this.getAplicadaVacinaCartao().setCpf_agente(this.adsUsuario.getAuth().decodificaToken().cpf);
        this.getAplicadaVacinaCartao().setDataAplicacao( dataHoje.toISOString().substring(0,10) );
        // this.tipoDaVacina = queryParams['']
      }
    );
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

    // this.getAplicadaVacinaCartao().setDataValidade(if())
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
                                                    this.router.navigate(['workspace-ads']);
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


   /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todos as vacinas na base de dados.
  */
 getAllVacinasPorUbs(){
  console.log("CNES",this.adsUsuario.getAuth().decodificaToken().cnes)
  this.inscricao = this.workspaceUbsService.getAllVacinasPorUbs(this.adsUsuario.getAuth().decodificaToken().cnes).subscribe(

      result => {
                  this.resultadoApi = result;
                  this.workspaceUbsVacinas  = this.resultadoApi.registros;
                  console.log("X",this.workspaceUbsVacinas)
                },
      error => {
                  this.setErrosApi(error);
               }
  );
}

  /**
   * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
   *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
   * @param error error ocasionado na aplicação. 
   */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + AplicarVacinaCartaoComponent.countErros++  ;
    console.log(this.errosApi);
  }

}
