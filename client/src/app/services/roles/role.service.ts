import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from 'src/app/interfaces/roles';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  save(data: Roles): Observable<Roles> {
    return this.http
      .post<Roles>(`${this.API_URI}api/roles`, data)
      .pipe(catchError(this.handlerError));
  }

  getRole(id: string): Observable<Roles> {
    return this.http
      .get<Roles>(`${this.API_URI}api/roles/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getRoles(): Observable<Roles> {
    return this.http
      .get<Roles>(`${this.API_URI}api/roles`)
      .pipe(catchError(this.handlerError));
  }

  updateRoles(id: string, updatedRole: string): Observable<Roles> {
    return this.http
      .put<Roles>(`${this.API_URI}api/roles/${id}`, updatedRole)
      .pipe(catchError(this.handlerError));
  }

  deleteRoles(id: string): Observable<Roles> {
    return this.http
      .delete<Roles>(`${this.API_URI}api/roles/${id}`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error has occurred', error.error);
    } else {
      console.error('Server return status code', error.status, error.error);
    }
    return throwError(
      () => new Error('Something went wrong, please try again')
    );
  }
}
