import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Obj } from 'src/app/interfaces/objects';

@Injectable({
  providedIn: 'root',
})
export class ObjectsService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://3j5c3z51-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  getObjs(): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects`)
      .pipe(catchError(this.handlerError));
  }

  saveObjs(data: Obj): Observable<Obj> {
    return this.http
      .post<Obj>(`${this.API_URI}api/objects`, data)
      .pipe(catchError(this.handlerError));
  }

  updateObj(id: string, val: string): Observable<Obj> {
    return this.http
      .put<Obj>(`${this.API_URI}api/objects/${id}`, val)
      .pipe(catchError(this.handlerError));
  }

  deleteObj(id: string): Observable<Obj> {
    return this.http
      .delete<Obj>(`${this.API_URI}api/objects/${id}`)
      .pipe(catchError(this.handlerError));
  }
  getObjTemplate(id: string): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects/ot/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObjCompany(id: string): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects/oc/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObj(id: string): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObjTemplateLength(id: string): Observable<Obj> {
    return this.http
      .get<Obj>(`${this.API_URI}api/objects/length/${id}`)
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
