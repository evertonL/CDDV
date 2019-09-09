import { Component, OnInit } from '@angular/core';
import { Populacao } from './populacao';
import { Router, ActivatedRoute } from '@angular/router';
import { PopulacaoService } from './cadastrar-populacao-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cadastrar-populacao',
  templateUrl: './cadastrar-populacao.component.html',
  styleUrls: ['./cadastrar-populacao.component.css']
})
export class CadastrarPopulacaoComponent {
  
  //TAMANHO DOS CAMPOS 
   public SIZE_CARTAO_SUS             = 15;
   public SIZE_NOME_DA_MAE            = 60;
   public SIZE_MUNICIPIO_DE_NACIMENTO = 30;
   public SIZE_ESTADO                 = 2;
   public SIZE_ENDERECO               = 60;
   public SIZE_NOME_DO_PAI            = 60;
   public SIZE_NOME                   = 50;
   public SIZE_SENHA                  = 32;
 
   private inscricao = new Subscription;
   private populacao: Populacao = null;
   private confirmaSenha: string;
   private camposObrigatorios      = false;
   private mensagemAviso           = null;
   private errosApi                = null;
 
   static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere
 
 
   constructor(private router: Router,
     private populacaoService: PopulacaoService,
     private route: ActivatedRoute) {
 
     this.populacao = new Populacao();
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
   private registrar(){
 
     if( this.validarCampus() ){
       console.log(this);
       this.camposObrigatorios = true;
       alert("prencha todos os Campos");
       return;
 
     }else if(this.getCadastrarPopulacao().getSenha() != this.confirmaSenha){
       alert("As senhas não são iguais");
     }else{
       this.camposObrigatorios = false;
       this.salvaPopulacao()
     }
   }
 
   /**
    * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
    */
   private salvaPopulacao(){
    console.log(this.getCadastrarPopulacao());
     this.populacaoService.salvaPopulacao(this.getCadastrarPopulacao())
                           .subscribe( 
                                         result =>{ 
                                                     alert("Registrado com Sucesso");
                                                     this.populacao = new Populacao();
                                                     this.confirmaSenha = '';
                                                  }
                                      );
 
     
   }
 
   /**
    * @description Retorna instancia de CadastroPopulacao alocado.
    * @return {Populacao} - Instância alocada em memória
    */
   private getCadastrarPopulacao(): Populacao {
 
     if (this.populacao == null) {
 
       this.populacao = new Populacao();
     }
 
     return this.populacao;
   }
 
     /**
    *@description  Valida se campos estão vazios.
    *@returns true caso algum campo esteja vazio, false caso contrário.
    */
   private validarCampus(){
 
    return this.getCadastrarPopulacao().getCartaoSus()                      == undefined ||  
           this.getCadastrarPopulacao().getNomeDaMae()                      == undefined ||  
           this.getCadastrarPopulacao().getMunicipioDeNacimento()           == undefined ||  
           this.getCadastrarPopulacao().getEstado()                         == undefined ||  
           this.getCadastrarPopulacao().getEndereco()                       == undefined ||  
           this.getCadastrarPopulacao().getNomeDoPai()                      == undefined ||  
           this.getCadastrarPopulacao().getSexo()                           == undefined ||  
           this.getCadastrarPopulacao().getNome()                           == undefined ||  
           this.getCadastrarPopulacao().getDataNacimento()                  == undefined ||     
           this.getCadastrarPopulacao().getSenha()                          == undefined ||
           this.confirmaSenha                                               == undefined ||
           this.getCadastrarPopulacao().getCartaoSus().trim()               == ''        ||
           this.getCadastrarPopulacao().getNomeDaMae().trim()               == ''        ||
           this.getCadastrarPopulacao().getMunicipioDeNacimento().trim()    == ''        ||
           this.getCadastrarPopulacao().getEstado().trim()                  == ''        ||
           this.getCadastrarPopulacao().getEndereco().trim()                == ''        ||
           this.getCadastrarPopulacao().getNomeDoPai().trim()               == ''        ||
           this.getCadastrarPopulacao().getSexo().trim()                    == ''        ||
           this.getCadastrarPopulacao().getNome().trim()                    == ''        ||
           this.getCadastrarPopulacao().getSenha().trim()                   == ''        ||
           this.confirmaSenha                                               == ''        ||
           this.getCadastrarPopulacao().getCartaoSus()                      == null      ||  
           this.getCadastrarPopulacao().getNomeDaMae()                      == null      ||  
           this.getCadastrarPopulacao().getMunicipioDeNacimento()           == null      ||
           this.getCadastrarPopulacao().getEstado()                         == null      ||
           this.getCadastrarPopulacao().getEndereco()                       == null      ||
           this.getCadastrarPopulacao().getNomeDoPai()                      == null      ||
           this.getCadastrarPopulacao().getSexo()                           == null      ||
           this.getCadastrarPopulacao().getNome()                           == null      ||
           this.getCadastrarPopulacao().getDataNacimento()                  == null      ||
           this.getCadastrarPopulacao().getSenha()                          == null      ||
           this.confirmaSenha                                               == null      
           ? true : false;
   }

}
