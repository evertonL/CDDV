// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Ubs } from './ubs';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class UbsService {

  private UbsApi: string = "http://localhost:3000/api/cadastrarUbs"

  constructor(private http: HttpClient) { }


  /**
   * @description envia solicitação para API salvar Ubs na base de dados.
   * @param Ubs objeto de Ubs que deve ser salvo.
   * @returns Observable 
   */
  salvaUbs(Ubs: Ubs): Observable<Ubs> {

    return this.http.post<Ubs>(this.UbsApi, Ubs, httpOption)
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
