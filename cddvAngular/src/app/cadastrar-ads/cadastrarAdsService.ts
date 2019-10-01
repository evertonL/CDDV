// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Agente } from './agente';
import { AuthAdsService } from '../login-ads/authAds.service';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private AgenteApi: string = "http://localhost:3000/api/cadastrarAds"
  private autenticar : AuthAdsService =  null;

  constructor(private http: HttpClient) { }


  /**
   * @description Retorna a classe de autenticação do usuário.
   * @returns {AuthAdsService} instância do AuthAdsService do usuario do agente em saude em questão
   */
  public getAuth():AuthAdsService{

    if(this.autenticar == null){
      this.autenticar = new AuthAdsService(this.http);
    }
    return this.autenticar;
  }

  /**
   * @description envia solicitação para API salvar Agente na base de dados.
   * @param Agente objeto de Agente que deve ser salvo.
   * @returns Observable 
   */
  salvaAgente(Agente: Agente): Observable<Agente> {

    return this.http.post<Agente>(this.AgenteApi, Agente, httpOption)
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
