// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// MÓDULOS PERSONALIZADOS
import { Agente } from './agente';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private AgenteApi: string = "http://localhost:3000/api/Agente"

  constructor(private http: HttpClient) { }


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
   * @description envia solicitação para API atualizar Agente na base de dados.
   * @param Agente objeto de Agente que deve ser atualizado.
   * @returns Observable
   */
  atualizaAgente(Agente: Agente): Observable<Agente> {

    return this.http.put<Agente>(this.AgenteApi, Agente, httpOption)
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }


  /**
   * @description envia solicitação para API deletar Agente da base de dados.
   * @param Agente objeto de Agente que deve ser deletado
   * @returns Observable
   */
  deletaAgente(Agente: Agente) {
                            //tenho q verificar se é "/" isso mesmo
    return this.http.delete<Agente>(this.AgenteApi + "/" + Agente.getCpfAgente())
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }


  /**
   * @description envia solicitação para API consultar todas os Agentes cadastrados 
   *              na base de dados.
   */
  getAllAgentes(): Observable<Agente[]> {

    return this.http.get<Agente[]>(this.AgenteApi)
      .pipe(
        catchError(
          this.errorHandler
        )
      );
  }


  /**
   * @description envia solicitação para API consultar os Agentes pela descrição.
   * @param descricao descricao dos Agentes a serem localizadas. 
   * @returns Observable
   */
  getAgentesPorDescricao(descricao: String): Observable<Agente[]> {
                           //tenho q verificar se é "/" isso mesmo
    return this.http.get<Agente[]>(this.AgenteApi + "/" + descricao)
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
