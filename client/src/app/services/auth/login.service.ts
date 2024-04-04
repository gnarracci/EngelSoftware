import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { RoleService } from '../roles/role.service';
import { Roles } from 'src/app/interfaces/roles';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  userRoles: string = '';

  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient, private appRoles: RoleService) {
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
        this.userRoles = userData.user.role[0].role;  
        // console.log('userRoles: ',this.userRoles )    
      }),
      map((userData) => userData.token),
      catchError(this.handlerError)
    );
  }

  logout():void {
    sessionStorage.removeItem("token");
    localStorage.removeItem("idc");
    this.currentUserLoginOn.next(false);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error has occurred', error.error);
    } else {
      console.error(
        'Server return status code',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Something went wrong, please try again')
    );
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String {
    return this.currentUserData.value
  }
}
