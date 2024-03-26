import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Obj } from 'src/app/interfaces/objects';
import { Types } from 'src/app/interfaces/types';
import { Fields } from 'src/app/interfaces/fields';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  saveObj(data: Obj): Observable<Obj> {
    return this.http
      .post<Obj>(`${this.API_URI}api/objects`, data)
      .pipe(catchError(this.handlerError));
  }

  getAllObj(): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects`)
      .pipe(catchError(this.handlerError));
  }

  getAllDatatypes(): Observable<Types> {
    return this.http
      .get<Types>(`${this.API_URI}api/types`)
      .pipe(catchError(this.handlerError));
  }

  updateObj(id: string, updatedField: string[]): Observable<Obj> {
    return this.http
      .put<Obj>(`${this.API_URI}api/objects/${id}`, updatedField)
      .pipe(catchError(this.handlerError));
  }

  updateFields(id: string, updatedField: string[]): Observable<Obj> {
    return this.http
      .put<Obj>(`${this.API_URI}api/objects/fields/${id}`, updatedField)
      .pipe(catchError(this.handlerError));
  }

  deleteObj(id: string): Observable<Obj> {
    return this.http
      .delete<Obj>(`${this.API_URI}api/objects/${id}`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error has occurred', error.error);
    } else {
      console.error('Server return status code', error.status, error.error);
    }
    return throwError(
      () => new Error('Something went wrong!, please try again')
    );
  }
}
