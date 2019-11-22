import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';

// MÓDULOS PERSONALIZADOS

import { Cartao } from './cartao';

const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {

  private cartaoApiVacinas: String = "http://localhost:3000/api/cadastrarCartao"  // rever

  constructor(private http: HttpClient) { }


 /**
  * @description envia solicitação para API verificar se o cartao do sus infromado está cadastrado no saite.
  */
getCartaoDaPopulacao(cartao_sus:String) : Observable<Cartao[]>{

  console.log("Passou pela funcao Do service: " + cartao_sus);
  return this.http.get<Cartao[]>(this.cartaoApiVacinas + "/" + cartao_sus )
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
