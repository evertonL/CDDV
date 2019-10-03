import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AplicarVacinaService } from './aplicar-vacina.service';
import { AplicadaVacinaCartao } from './aplicar-vacina-cartao';
import { Subscription } from 'rxjs';
import { Vacina } from '../cadastrar-vacina/vacina';
import { WorkspaceUbsService } from '../workspace-ubs/workspace-ubs.service';
import { AgenteService } from '../cadastrar-ads/cadastrarAdsService';
import { parseDate } from 'tough-cookie';

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
  private tempoVacina         : Date                = null;
  private data: String;
  private status                  = false;
  
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
        this.getAplicadaVacinaCartao().setDataAplicacao( dataHoje.toISOString().substr(0,10));

        //verifico se esta atualizando ou cadastrando
        this.setStatus(queryParams['verificacao']);

        this.tipoDaVacina = queryParams['select']; // tipo da vacina A=ano,M=mes,D=dia,U=unica
        this.tempoVacina = queryParams['periodo']; //numero de tempo que vale a vacina 
        console.log("dataHOje",dataHoje)
        let dataValidade = null;
        dataValidade = this.gerarDataValidade(dataHoje);
        this.getAplicadaVacinaCartao().setDataValidade(dataValidade);

        console.log("tipoDaVacina",this.gerarDataValidade(dataHoje));
        
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
  * @description Função valida se informações do formulário estão corretas. 
  */
 private registrarVacina(){

  if( this.validarCampus() ){

    this.camposObrigatorios = true;
    alert("Prencha todos os Campos");
    return;

  }else if(this.getStatus() == undefined){

    console.log("salva",this.status)
    this.camposObrigatorios = false;
    this.salvaAplicarVacina()

  }else{
   
   console.log("atulizar",this.status)
   this.camposObrigatorios = false;
   this.status = false;
   this.atualizarAplicarVacina()

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
 * @description Se inscreve no serviço que envia solicitação para API atualizar a vacinas na base de dados.
 */
 private atualizarAplicarVacina(){

  //Envia solicitação para atualizar formulário
  this.aplicarVacinaService.atualizarAplicarVacina(this.aplicarVacina).subscribe(

              result =>{ 
                          alert("Vacina Atualizada com Sucesso");
                          this.router.navigate(['workspace-ads']);
                        },
              erros => { 
                          this.setErrosApi(erros);
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

   /**
   * @description função que gera a data de valide de acordo com o tempo de imunizacao da vacina
   */
  gerarDataValidade(dataHoje){
   if(this.tipoDaVacina == 'A'){
     
     
    let dia = dataHoje.toISOString(8,2);
    let mes = dataHoje.toISOString(6,1);
    let ano = dataHoje.setFullYear(dataHoje.getFullYear() + this.tempoVacina);
    console.log('Ano',ano);

    let data = new Date(ano,mes,dia);

    return data;

   }

   if(this.tipoDaVacina == 'M'){

    let dia = dataHoje.toISOString().substr(8,2);
    let mes = dataHoje.setMonth(dataHoje.getMonth() + this.tempoVacina);
    let ano = dataHoje.toISOString().substr(0,4);
    console.log('Mes',mes);

    let data = new Date(ano,mes,dia);
    console.log("dataOk",data)
    console.log("dataQestaVindo",dataHoje)
    return data;
   }

   if(this.tipoDaVacina == 'D'){
    
    dataHoje.setDate(dataHoje.getDate() + this.tempoVacina);

    console.log('Dia>',dataHoje,' Tempo>',this.tempoVacina);

    return dataHoje;
   }

   if(this.tipoDaVacina == 'U'){
    console.log('Unico');

    let data = new Date();

    return data;
   }
  }

  public getStatus(){
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }

}
