import { Component, OnInit } from '@angular/core';
import { Ubs } from './ubs';
import { Router, ActivatedRoute } from '@angular/router';
import { UbsService } from './cadastrarUbsService';
import { Subscription } from 'rxjs'; // precisa instalar

@Component({
  selector: 'app-cadastrar-ubs',
  templateUrl: './cadastrar-ubs.component.html',
  styleUrls: ['./cadastrar-ubs.component.css']
})

export class CadastrarUbsComponent /*implements OnInit*/ {

  //TAMANHO DOS CAMPOS 

  public SIZE_CNES            = 8  ;
  public SIZE_NOME_DA_UNIDADE = 60 ;
  public SIZE_MUNICIPIO       = 30 ;
  public SIZE_BAIRRO          = 30 ;
  public SIZE_ENDERECO        = 60 ;
  public SIZE_ESTADO          = 2  ;
  public SIZE_TELEFONE        = 12 ;
  public SIZE_CEP             = 8  ;
  public SIZE_SENHA           = 32 ;
  public SIZE_CONFIRMA_SENHA  = 32 ;

  private confirmaSenha: string;
  private inscricao               = new Subscription;
  private ubs: Ubs                = null;
  private camposObrigatorios      = false;
  private mensagemAviso           = null;
  private errosApi                = null;

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere


  constructor(private router: Router,
    private ubsService: UbsService,
    private route: ActivatedRoute) {

    this.ubs = new Ubs();
  }


  // ngOnInit() {

  //   //Recupera o conteudo dos parametros e inicializa campos.
  //   //Também resgata a instancia da inscrição.
  //   this.inscricao = this.route.queryParams.subscribe(
  //     (queryParams: any) => {

  //       this.getCadastrarUbs().setCnes(queryParams['cnes']);
  //       this.getCadastrarUbs().setNomeDaUnidade( queryParams['nome_da_unidade']);
  //       this.getCadastrarUbs().setMunicipio(queryParams['municipio']);
  //       this.getCadastrarUbs().setBairro(queryParams['bairro']);
  //       this.getCadastrarUbs().setEndereco(queryParams['endereco'])             
  //       this.getCadastrarUbs().setEstado(queryParams['estado']);
  //       this.getCadastrarUbs().setTelefone(queryParams['telefone']);
  //       this.getCadastrarUbs().setCep(queryParams['cep']); 
  //       this.getCadastrarUbs().setSenha(queryParams['senha']);
  //       // this.getCadastrarUbs().setBloqueado(queryParams['bloqueado']);

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

    }else if(this.getCadastrarUbs().getSenha() != this.confirmaSenha){

      alert("Campo Senha e Confirma Senha não são iguais!");
      return;

    }else{

      this.camposObrigatorios = false;
      this.salvaUbs()

    }
  }

  /**
   * @description Se inscreve no serviço que envia solicitação para API salvar frequência na base de dados.
   */
  private salvaUbs(){
   
    this.ubsService.salvaUbs(this.ubs)
                          .subscribe( 
                                        result =>{ 
                                                    alert("Registrado com Sucesso");
                                                    this.ubs = new Ubs();
                                                 }
                                     );

    
  }

  /**
   * @description Retorna instancia de CadastroUbs alocado.
   * @return {ubs} - Instância alocada em memória
   */
  private getCadastrarUbs(): Ubs {

    if (this.ubs == null) {

      this.ubs = new Ubs();
    }

    return this.ubs;
  }

    /**
   *@description  Valida se campos estão vazios.
   *@returns true caso algum campo esteja vazio, false caso contrário.
   */
  private validarCampus(){

    return this.getCadastrarUbs().getCnes()                 == undefined ||  
           this.getCadastrarUbs().getNomeDaUnidade()        == undefined ||  
           this.getCadastrarUbs().getMunicipio()            == undefined ||
           this.getCadastrarUbs().getBairro()               == undefined ||
           this.getCadastrarUbs().getEndereco()             == undefined ||
           this.getCadastrarUbs().getEstado()               == undefined ||
           this.getCadastrarUbs().getTelefone()             == undefined ||
           this.getCadastrarUbs().getCep()                  == undefined ||
           this.getCadastrarUbs().getSenha()                == undefined ||
           //this.getCadastrarUbs().getBloqueado()            == undefined ||    falta imprementar no banco
           this.confirmaSenha                               == undefined ||
           this.getCadastrarUbs().getCnes().trim()          == ''        ||
           this.getCadastrarUbs().getNomeDaUnidade().trim() == ''        ||
           this.getCadastrarUbs().getMunicipio().trim()     == ''        ||
           this.getCadastrarUbs().getBairro().trim()        == ''        ||
           this.getCadastrarUbs().getEndereco().trim()      == ''        ||
           this.getCadastrarUbs().getEstado().trim()        == ''        ||
           this.getCadastrarUbs().getTelefone().trim()      == ''        ||
           this.getCadastrarUbs().getCep().trim()           == ''        ||
           this.getCadastrarUbs().getSenha().trim()         == ''        ||
           this.confirmaSenha                               == ''        ||
           this.getCadastrarUbs().getCnes()                 == null      ||  
           this.getCadastrarUbs().getNomeDaUnidade()        == null      ||  
           this.getCadastrarUbs().getMunicipio()            == null      ||
           this.getCadastrarUbs().getBairro()               == null      ||
           this.getCadastrarUbs().getEndereco()             == null      ||
           this.getCadastrarUbs().getEstado()               == null      ||
           this.getCadastrarUbs().getTelefone()             == null      ||
           this.getCadastrarUbs().getCep()                  == null      ||
           this.getCadastrarUbs().getSenha()                == null      ||
           //this.getCadastrarUbs().getBloqueado()            == null      ||     falta imprementar no banco
           this.confirmaSenha                               == null      
            ? true : false;
  }
}