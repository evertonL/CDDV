// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Ubs } from '../cadastrar-ubs/ubs';
import { Agente } from '../cadastrar-ads/agente';
import { Populacao } from '../cadastrar-populacao/populacao';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})

export class AdministradorService {

  private AdministradorApi1 : string = "http://localhost:3000/api/cadastrarUbs"
  private AdministradorApi2 : string = "http://localhost:3000/api/cadastrarAds"
  private AdministradorApi3 : string = "http://localhost:3000/api/cadastrarPopulacao"

  constructor(private http: HttpClient) { }
  
 /**
  * @description envia solicitação para API consultar todas as UBS cadastradas 
  *              na base de dados.
  */
 getAllUbs() : Observable<Ubs[]>{

  return this.http.get<Ubs[]>(this.AdministradorApi1)
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
}

 /**
  * @description envia solicitação para API consultar todas as UBS cadastradas 
  *              na base de dados.
  */
 getAllAds() : Observable<Agente[]>{

  return this.http.get<Agente[]>(this.AdministradorApi2)
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
}

 /**
  * @description envia solicitação para API consultar todas as UBS cadastradas 
  *              na base de dados.
  */
 getAllPopulacao() : Observable<Populacao[]>{

  return this.http.get<Populacao[]>(this.AdministradorApi3)
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
