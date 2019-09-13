import { Component, OnInit } from '@angular/core';
import { Vacina } from './vacina';
import { Router, ActivatedRoute } from '@angular/router';
import { VacinaService } from './cadastrar-vacina.service';
import { Subscription } from 'rxjs'; // precisa instalar

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
 public SIZE_PERIODO_DE_IMUNIZACAO = 2 ;

 private inscricao               = new Subscription;
 private vacina: Vacina          = null;
 private camposObrigatorios      = false;
 private mensagemAviso           = null;
 private errosApi                = null;

 static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


 constructor(private router: Router,
   private vacinaService: VacinaService,
   private route: ActivatedRoute) {

   this.vacina = new Vacina();
 }


 // ngOnInit() {

 //   //Recupera o conteudo dos parametros e inicializa campos.
 //   //Também resgata a instancia da inscrição.
 //   this.inscricao = this.route.queryParams.sVacinacribe(
 //     (queryParams: any) => {

 //       this.getCadastrarVacina().setCnes(queryParams['cnes']);
 //       this.getCadastrarVacina().setNomeDaUnidade( queryParams['nome_da_unidade']);
 //       this.getCadastrarVacina().setMunicipio(queryParams['municipio']);
 //       this.getCadastrarVacina().setBairro(queryParams['bairro']);
 //       this.getCadastrarVacina().setEndereco(queryParams['endereco'])             
 //       this.getCadastrarVacina().setEstado(queryParams['estado']);
 //       this.getCadastrarVacina().setTelefone(queryParams['telefone']);
 //       this.getCadastrarVacina().setCep(queryParams['cep']); 
 //       this.getCadastrarVacina().setSenha(queryParams['senha']);
 //       // this.getCadastrarVacina().setBloqueado(queryParams['bloqueado']);

 //     }
 //   );

 // }

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

   }else{

     this.camposObrigatorios = false;
     this.salvaVacina()

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
          this.getCadastrarVacina().getNome().trim()                 == ''        ||
          this.getCadastrarVacina().getLote().trim()                 == ''        ||
          this.getCadastrarVacina().getNomeDaUnidade().trim()        == ''        ||
          this.getCadastrarVacina().getPeriodoDeImunizacao().trim()  == ''        ||
          this.getCadastrarVacina().getNome()                        == null      ||  
          this.getCadastrarVacina().getLote()                        == null      ||  
          this.getCadastrarVacina().getNomeDaUnidade()               == null      ||
          this.getCadastrarVacina().getQtdVacina()                   == null      ||
          this.getCadastrarVacina().getPeriodoDeImunizacao()         == null          
           ? true : false;
 }

}
