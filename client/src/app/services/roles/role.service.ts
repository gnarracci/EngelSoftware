import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from 'src/app/interfaces/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Roles> {
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
    return throwError(() => new Error('Something went wrong, please try again'));
  }
}
