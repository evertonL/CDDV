// MÓDULOS PADRÕES
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// MÓDULOS PERSONALIZADOS
import { Ubs } from './ubs';
import { AuthService } from '../login-ubs/auth.service';


const httpOption = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}

@Injectable({
  providedIn: 'root'
})

export class UbsService {

  private UbsApi     : string      = "http://localhost:3000/api/cadastrarUbs"
  private autenticar : AuthService =  null;

  constructor(private http: HttpClient) { }


  /**
   * @description Retorna a classe de autenticação do usuário.
   * @returns {AuthService} instância do AuthService do usuario da Ubs em questão
   */
  public getAuth():AuthService{

    if(this.autenticar == null){
      this.autenticar = new AuthService(this.http);
    }
    return this.autenticar;
  }


  /**
  * @description retorna usuário logado de acordo com informações do token
  */
  public getUsuarioUbs(){
    return this.getAuth().decodificaToken();
  }

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
  * @description envia solicitação para API atualizar usuario na base de dados.
  * @param Ubs objeto da usuario que deve ser atualizada.
  * @returns Observable
  */
  public atualizarUbs(Ubs : Ubs): Observable<Ubs>{
  
  return this.http.put<Ubs>(this.UbsApi, Ubs, httpOption)
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
  getAllUbs() : Observable<Ubs[]>{

  return this.http.get<Ubs[]>(this.UbsApi)
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
