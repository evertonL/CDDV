// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// MÓDULOS PERSONALIZADOS
import { Populacao } from './populacao';
import { AuthPopulacaoService } from '../login-populacao/authPopulacao.service';

const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class PopulacaoService {

  private PopulacaoApi: string = "http://localhost:3000/api/cadastrarPopulacao"
  private autenticar  : AuthPopulacaoService =  null;

  constructor(private http: HttpClient) { }

    /**
   * @description Retorna a classe de autenticação do usuário.
   * @returns {AuthAdsService} instância do AuthAdsService do usuario do agente em saude em questão
   */
  public getAuth():AuthPopulacaoService{

    if(this.autenticar == null){
      this.autenticar = new AuthPopulacaoService(this.http);
    }
    return this.autenticar;
  }

  /**
   * @description envia solicitação para API salvar a Populcao na base de dados.
   * @param Populacao objeto de Populacao que deve ser salvo.
   * @returns Observable 
   */
  salvaPopulacao(Populacao: Populacao): Observable<Populacao> {

    return this.http.post<Populacao>(this.PopulacaoApi, Populacao, httpOption)
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }

  /**
   * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
   * @param error erros gerados ao fazer solicitações à API
   * @returns retorna uma string contendo o erro que acontenceu. 
   */
  errorHandler(error: HttpErrorResponse) {

    return throwError(error.error.mensagem || "Servidor com Erro! " + error.message);
  }

}
