import { Component, OnInit   } from '@angular/core';
import { Subscription        } from 'rxjs';
import { workspaceAds        } from './workspaceAds';
import { WorkspaceAdsService } from './workspaceAdsService';
import { Populacao           } from '../cadastrar-populacao/populacao';
import { Router              } from '@angular/router';
import { AgenteService       } from '../cadastrar-ads/cadastrarAdsService';

@Component({
  selector: 'app-workspace-ads',
  templateUrl: './workspace-ads.component.html',
  styleUrls: ['./workspace-ads.component.css']
})
export class WorkspaceAdsComponent implements OnInit {


  private inscricao                                 = new Subscription;
  private resultadoApi                              = null;
  private errosApi                                  = null;
  private workspaceAdsVacinas      : workspaceAds[] = [];
  private workspaceChecarPopulacao : Populacao[]    = [];
  private pesquisa                 : String         = "";
  private nomeAdsLogado                             = this.usuarioAds.getAuth().decodificaToken().nome; //pego o nome do token do agente de saude que efetuo o login 
  private dataAtual : Date = new Date();

  static countErros = 1;        // Variavel de controle usada para forçar que a msgm de erros sempre altere

  constructor(private workspaceAdsService: WorkspaceAdsService, 
              private usuarioAds: AgenteService, 
              private router: Router) { }


  ngOnInit() { }


  /**
  * destruo a inscrição ao fechar.
  */
  ngOnDestroy() {

    this.inscricao.unsubscribe();

  }


  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar todas frequências 
  *               pela descricao na base de dados.
  */
  getCartaoDaPopulacao() {

    this.workspaceAdsService.getCartaoDaPopulacao(this.pesquisa).subscribe(

      result => {

        this.resultadoApi = result;
        this.workspaceAdsVacinas = this.resultadoApi.registros;

        if (this.workspaceAdsVacinas.length == 0) {

          alert("Não a Vacinas para o cartao pesquisado! ");

        }

      },
      error => {

        this.setErrosApi(error);

      }
    );
    console.log(this.workspaceAdsVacinas);
  }

  /**
  * @description: Se inscreve no serviço que envia solicitação para API resgatar o individo do banco de dados
  * de acordo com o o numero do cartao do sus pesquisado.
  */
  getChecarPopulacao() {

    if (this.pesquisa.trim() == "") {

      alert("Usuario não Encontrado! Verifique o numero digitado.")

    } else {

      this.workspaceAdsService.getChecarPopulacao(this.pesquisa).subscribe(

        result => {
          this.resultadoApi = result;
          this.workspaceChecarPopulacao = this.resultadoApi.registros;

          if (this.workspaceChecarPopulacao.length == 0) {

            alert("O Cartão Pesquisado não está Cadastrado!")

          } else (

            this.getCartaoDaPopulacao()

          );
        },
        error => {

          this.setErrosApi(error);

        }
      );
    }
    console.log(this.workspaceAdsVacinas);
  }

  /**
   * @description: Funcão que exclui a chave do Local Storage e chama a home.
   */
  sair() {

    this.usuarioAds.getAuth().logout();
    this.router.navigate(['home']);

  }

  /**
    * @description função seta conteudo da variavel erroApi, ela faz uso da varivel estática [ ela incrementa a countErros]
    *              para que a mensagem sempre seja alterada e assim ouvida pelo ngOnChanges da tela-mensagem
    * @param error error ocasionado na aplicação. 
    */
  setErrosApi(error) {

    this.errosApi = error + " /countErros: " + WorkspaceAdsComponent.countErros++;
    console.log(this.errosApi);

  }

  compararData(dataValidade){
    
    let dia = dataValidade.substr(8,2);
    let mes = dataValidade.substr(5,2) - 1;
    let ano = dataValidade.substr(0,4);

    let hoje = new Date();

    dataValidade = new Date(ano,mes,dia);
    console.log("hoja= ",hoje,"DataValidade= ",dataValidade,"return",hoje >= dataValidade ? true:false);
      return hoje >= dataValidade ? true:false
  }



}
