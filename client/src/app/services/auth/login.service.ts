import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('token') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('token') || ''
    );
  }

  login(credentials:User): Observable<User> {
    return this.http.post<any>(`${this.API_URI}api/auth/signin`, credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handlerError)
    );
  }

  logout():void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se a producido un error', error.error);
    } else {
      console.error(
        'Backend retorno el codigo de estado',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo fallo, por favor intente nuevamente')
    );
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
