// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AplicadaVacinaCartao } from './aplicar-vacina-cartao';

const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class AplicarVacinaService {

  private aplicarVacinaApi: string = "http://localhost:3000/api/cadastrarCartao"

  constructor(private http: HttpClient) { }


  /**
   * @description envia solicitação para API salvar a Populcao na base de dados.
   * @param AplicadaVacinaCartao objeto de aplicadaVacinaCartao que deve ser salvo.
   * @returns Observable 
   */
  salvaAplicarVacinas(AplicadaVacinaCartao: AplicadaVacinaCartao): Observable<AplicadaVacinaCartao> {

    return this.http.post<AplicadaVacinaCartao>(this.aplicarVacinaApi, AplicadaVacinaCartao, httpOption)
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }

    /**
   * @description envia solicitação para API atualizar a Vacina na base de dados.
   * @param AplicadaVacinaCartao objeto de Vacina que deve ser atualizado.
   * @returns Observable 
   */
  atualizarAplicarVacina(AplicadaVacinaCartao: AplicadaVacinaCartao): Observable<AplicadaVacinaCartao> {

    return this.http.put<AplicadaVacinaCartao>(this.aplicarVacinaApi, AplicadaVacinaCartao, httpOption)
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
