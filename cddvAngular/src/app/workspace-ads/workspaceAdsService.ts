import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';

// MÓDULOS PERSONALIZADOS

import { workspaceAds } from './workspaceAds';
import { Populacao    } from '../cadastrar-populacao/populacao'

const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceAdsService {

  private WorkspaceAdsApiVacinas: String = "http://localhost:3000/api/workSpaceAds"
  private checarIndivido        : String = "http://localhost:3000/api/checarPopulacao"

  constructor(private http: HttpClient) { }


 /**
  * @description envia solicitação para API consultar todas as vacinas do usuario do cartao do sus.
  */
 getChecarPopulacao(pesquisa:String) : Observable<Populacao[]>{
    console.log("passou aqui " + pesquisa);
    return this.http.get<Populacao[]>(this.checarIndivido + "/" + pesquisa )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
                        
}

 /**
  * @description envia solicitação para API verificar se o cartao do sus infromado está cadastrado no saite.
  */
getCartaoDaPopulacao(pesquisa:String) : Observable<workspaceAds[]>{

  console.log("passou aqui " + pesquisa);
  return this.http.get<workspaceAds[]>(this.WorkspaceAdsApiVacinas + "/" + pesquisa )
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
