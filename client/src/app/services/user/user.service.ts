import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { Roles } from 'src/app/interfaces/roles';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';
  

  constructor(private http:HttpClient) { }

  getUser(id: string):Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/users/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/users`).pipe(
      catchError(this.handlerError)
    )
  }
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/auth/profile`).pipe(
      catchError(this.handlerError)
    )
  }

  save(data: User): Observable<User> {
    return this.http.post<User>(`${this.API_URI}api/users`, data).pipe(
      catchError(this.handlerError)
    )
  }

  updateUser(id: string, updatedUser: User): Observable<User> {
    return  this.http.put<User>(`${this.API_URI}api/users/${id}`, updatedUser).pipe(
      catchError(this.handlerError)
    )
  }

  roleType(): Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/auth/roleType`).pipe(
      catchError(this.handlerError)
    )
  }

  userType(): Observable<User> {
    return this.http.get<User>(`${this.API_URI}api/auth/userType`).pipe(
      catchError(this.handlerError)
    )
  }

  deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`${this.API_URI}api/users/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  rolesList(): Observable<Roles> {
    return this.http.get<Roles>(`${this.API_URI}api/roles`).pipe(
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error("An error has occurred", error.error)
    } else {
      console.error("Server return status code", error.status, error.error)
    }
    return throwError(() => new Error('Something went wrong!, please try again'));
  }

}
