// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Ubs } from '../cadastrar-ubs/ubs';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})

export class AdministradorService {

  private AdministradorApi: string = "http://localhost:3000/api/cadastrarUbs"

  constructor(private http: HttpClient) { }
  
 /**
  * @description envia solicitação para API consultar todas as UBS cadastradas 
  *              na base de dados.
  */
 getAllUbs() : Observable<Ubs[]>{

  return this.http.get<Ubs[]>(this.AdministradorApi)
                  .pipe(
                          catchError(
                                      this.errorHandler
                                    )
                        );
}

 /**
  * @description envia solicitação para API verificar se o nome da Ubs informado está cadastrado no saite.
  */
 getUbsCnes(pesquisa:String) : Observable<Ubs[]>{

  console.log("passou aqui " + pesquisa);
  return this.http.get<Ubs[]>(this.AdministradorApi + "/" + pesquisa )
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
