import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// MÓDULOS PERSONALIZADOS

import { workspaceAds } from './workspaceAds';

const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceAdsService {

  private WorkspaceAdsApi: String = "http://localhost:3000/api/workSpaceAds"

  constructor(private http: HttpClient) { }


 /**
  * @description envia solicitação para API consultar todas as vacinas do usuario do cartao do sus.
  */
 getCartaoDaPopulacao(cartaoSus:String) : Observable<workspaceAds[]>{
    console.log("passou aqui" + cartaoSus);
    return this.http.get<workspaceAds[]>(this.WorkspaceAdsApi + "/" + cartaoSus )
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
