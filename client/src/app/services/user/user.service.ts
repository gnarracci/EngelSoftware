import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:5000/';

  constructor(private http:HttpClient) { }

  getUser():Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/users`).pipe(
      catchError(this.handlerError)
    )
  }

  getProfile() {
    return this.http.get<User>(`${this.API_URI}api/auth/profile`).pipe(
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error("Se a producido un error", error.error)
    } else {
      console.error("Backend retorno el codigo de estado", error.status, error.error)
    }
    return throwError(() => new Error('Algo fallo, por favor intente nuevamente'));
  }

}
