import { Component, OnInit } from '@angular/core';
import { Vacina } from './vacina';
import { Router, ActivatedRoute } from '@angular/router';
import { VacinaService } from './cadastrar-vacina.service';
import { Subscription } from 'rxjs'; // precisa instalar
import { UbsService } from '../cadastrar-ubs/cadastrarUbsService';

@Component({
  selector: 'app-cadastrar-vacina',
  templateUrl: './cadastrar-vacina.component.html',
  styleUrls: ['./cadastrar-vacina.component.css']
})
export class CadastrarVacinaComponent /*implements OnInit*/ {

 //TAMANHO DOS CAMPOS 

 public SIZE_NOME                  = 25 ;
 public SIZE_LOTE                  = 25 ;
 public SIZE_NOME_DA_UNIDADE       = 30 ;
 public SIZE_PERIODO_DE_IMUNIZACAO = 2  ;

 private inscricao               = new Subscription;
 private vacina: Vacina          = null;
 private camposObrigatorios      = false;
 private mensagemAviso           = null;
 private errosApi                = null;
 private status                  = false;

 static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
              private vacinaService: VacinaService,
              private route: ActivatedRoute,private ubsUsuario: UbsService) {

              this.vacina = new Vacina();
  }


 ngOnInit() {

   //Recupera o conteudo dos parametros e inicializa campos.
   //Também resgata a instancia da inscrição.
   this.inscricao = this.route.queryParams.subscribe(
     (queryParams: any) => {

       this.getCadastrarVacina().setIdVacina(queryParams['id_vacina'])
       this.getCadastrarVacina().setNome(queryParams['nome']);
       this.getCadastrarVacina().setNomeDaUnidade( queryParams['nome_da_unidade']);
       this.getCadastrarVacina().setLote(queryParams['lote']);
       this.getCadastrarVacina().setQtdVacina(queryParams['qtd_vacinas']);
       this.getCadastrarVacina().setPeriodoDeImunizacao(queryParams['periodo_de_imunizacao']);           
       this.getCadastrarVacina().setSelectImunizacao(queryParams['select_tempo_imunizacao']);
       this.getCadastrarVacina().setCnes(this.ubsUsuario.getAuth().decodificaToken().cnes);

       //verifico se esta atualizando ou cadastrando
       this.setStatus(queryParams['verificacao']);

       console.log('deu certo',this.setStatus(queryParams['verificacao']));
       console.log(this.ubsUsuario.getAuth().decodificaToken());
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
 private registrar(){

   if( this.validarCampus() ){

     this.camposObrigatorios = true;
     alert("Prencha todos os Campos");
     return;

   }else if(this.getStatus() == undefined){

    console.log("salva",this.status)
     this.camposObrigatorios = false;
     alert("entro no salvar");
     this.salvaVacina()

   }else{
    
    console.log("atulizar",this.status)
    this.camposObrigatorios = false;
    this.status = false;
    this.atualizarVacina()

   }
 }

 /**
 * @description Se inscreve no serviço que envia solicitação para API salvar a vacinas na base de dados.
 */
 private salvaVacina(){
  
   this.vacinaService.salvaVacina(this.vacina)
                         .subscribe( 
                                       result =>{ 
                                                   alert("Registrado com Sucesso");
                                                   this.vacina = new Vacina();
                                                }
                                    );

   
 }

 /**
 * @description Se inscreve no serviço que envia solicitação para API atualizar a vacinas na base de dados.
 */
 private atualizarVacina(){

  //Envia solicitação para atualizar formulário
  this.vacinaService.atualizarVacina(this.vacina)
  .subscribe( 
              result =>{ 
                          alert("Vacina Atualizada com Sucesso");
                          this.router.navigate(['workspace-ubs']);
                        },
              erros => { 
                          this.setErrosApi(erros);
                        }
            );
 }

 /**
  * @description Retorna instancia de CadastroVacina alocado.
  * @return {Vacina} - Instância alocada em memória
  */
 private getCadastrarVacina(): Vacina {

   if (this.vacina == null) {

     this.vacina = new Vacina();
   }

   return this.vacina;
 }

   /**
  *@description  Valida se campos estão vazios.
  *@returns true caso algum campo esteja vazio, false caso contrário.
  */
 private validarCampus(){

   return this.getCadastrarVacina().getNome()                        == undefined ||  
          this.getCadastrarVacina().getLote()                        == undefined ||  
          this.getCadastrarVacina().getNomeDaUnidade()               == undefined ||
          this.getCadastrarVacina().getQtdVacina()                   == undefined ||
          this.getCadastrarVacina().getPeriodoDeImunizacao()         == undefined ||
          this.getCadastrarVacina().getSelectImunizacao()            == undefined ||
          this.getCadastrarVacina().getNome().trim()                 == ''        ||
          this.getCadastrarVacina().getLote().trim()                 == ''        ||
          this.getCadastrarVacina().getNomeDaUnidade().trim()        == ''        ||
          this.getCadastrarVacina().getPeriodoDeImunizacao().trim()  == ''        ||
          this.getCadastrarVacina().getSelectImunizacao().trim()     == ''        ||
          this.getCadastrarVacina().getNome()                        == null      ||  
          this.getCadastrarVacina().getLote()                        == null      ||  
          this.getCadastrarVacina().getNomeDaUnidade()               == null      ||
          this.getCadastrarVacina().getQtdVacina()                   == null      ||
          this.getCadastrarVacina().getPeriodoDeImunizacao()         == null      ||
          this.getCadastrarVacina().getSelectImunizacao()            == null    
           ? true : false;
 }

  /**
  * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
  *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
  * @param error error ocasionado na aplicação. 
  */
  setErrosApi(error){

    this.errosApi = error + " /countErros: " + CadastrarVacinaComponent.countErros++  ;
    console.log(this.errosApi);
  }

  public getStatus(){
    return this.status;
  }

  public setStatus(status: boolean): void {
    this.status = status;
  }
}
