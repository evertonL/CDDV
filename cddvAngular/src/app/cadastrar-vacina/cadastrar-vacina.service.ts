// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Vacina } from './vacina';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  private VacinaApi: string = "http://localhost:3000/api/cadastrarVacina"

  constructor(private http: HttpClient) { }


  /**
   * @description envia solicitação para API salvar a Vacina na base de dados.
   * @param Vacina objeto de Vacina que deve ser salvo.
   * @returns Observable 
   */
  salvaVacina(Vacina: Vacina): Observable<Vacina> {

    return this.http.post<Vacina>(this.VacinaApi, Vacina, httpOption)
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }

  /**
   * @description envia solicitação para API atualizar a Vacina na base de dados.
   * @param Vacina objeto de Vacina que deve ser atualizado.
   * @returns Observable 
   */
  atualizarVacina(Vacina: Vacina): Observable<Vacina> {

    return this.http.put<Vacina>(this.VacinaApi, Vacina, httpOption)
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
