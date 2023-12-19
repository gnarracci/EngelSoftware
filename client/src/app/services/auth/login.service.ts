import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({username:'', password:''});

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  login(user: User):Observable<User> {
    return this.http.post<User>(`${this.API_URI}api/auth/signin`, user).pipe(
      tap( userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
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

  get userData():Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
