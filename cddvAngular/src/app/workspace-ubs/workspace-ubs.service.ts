import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS

import { Agente } from '../cadastrar-ads/agente';
import { Vacina } from '../cadastrar-vacina/vacina';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceUbsService {

  private WorkspaceUbsApi1: String = "http://localhost:3000/api/workSpaceUbsAllAgentes"
  private WorkspaceUbsApi2: string = "http://localhost:3000/api/workSpaceUbsAllVacinas"

  constructor(private http: HttpClient) { }


 /**
  * @description envia solicitação para API consultar todos os agentes cadastrados na base de dados.
  */
 getAllAdsPorUbs(cnes:String) : Observable<Agente[]>{
   console.log("passou aqui" + cnes);
  return this.http.get<Agente[]>(this.WorkspaceUbsApi1 + "/" + cnes )
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
                        
}

 /**
  * @description envia solicitação para API consultar todas as vacinas cadastrados na base de dados.
  */
 getAllVacinasPorUbs(cnes:String) : Observable<Vacina[]>{
  console.log("passou aquiT", cnes);
 return this.http.get<Vacina[]>(this.WorkspaceUbsApi2 + "/" + cnes )
                 .pipe(
                         catchError(
                                     this.errorHandler
                                   )
                       );
                       
}

//    /**
//   * @description envia solicitação para API consultar o agente pelo nome.
//   * @param nome, nome do agente a sere localizado. 
//   * @returns Observable
//   */
//  getAgentePeloNome(nome:String, cnes:string) : Observable<Agente[]>{
   
//   return this.http.get<Agente[]>(this.WorkspaceUbsApi2 + "/" + cnes +","+ nome )
//                   .pipe(
//                           catchError(
//                                       this.errorHandler
//                                     )
//                         );
// }


  /**
   * @description Função intercepta e lança erros originados ao tentar fazer solicitações à API.
   * @param error erros gerados ao fazer solicitações à API
   * @returns retorna uma string contendo o erro que acontenceu. 
   */
  errorHandler(error: HttpErrorResponse) {

    return throwError(error.error.mensagem || "Servidor com Erro! " + error.message);
  }

}
