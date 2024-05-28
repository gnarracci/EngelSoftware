import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Descripobj } from 'src/app/interfaces/descripobj';

@Injectable({
  providedIn: 'root'
})
export class DescripobjService {

  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  getObjs(): Observable<Descripobj> {
    return this.http
      .get<Descripobj>(`${this.API_URI}api/descripobj`)
      .pipe(catchError(this.handlerError));
  }

  saveObjs(data: Descripobj): Observable<Descripobj> {
    return this.http
      .post<Descripobj>(`${this.API_URI}api/descripobj`, data)
      .pipe(catchError(this.handlerError));
  }

  updateObj(id: string, val: string): Observable<Descripobj> {
    return this.http
      .put<Descripobj>(`${this.API_URI}api/descripobj/${id}`, val)
      .pipe(catchError(this.handlerError));
  }

  deleteObj(id: string): Observable<Descripobj> {
    return this.http
      .delete<Descripobj>(`${this.API_URI}api/descripobj/${id}`)
      .pipe(catchError(this.handlerError));
  }
  getObjTemplate(id: string): Observable<Descripobj> {
    return this.http
      .get<Descripobj>(`${this.API_URI}api/descripobj/ot/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObjCompany(id: string): Observable<Descripobj> {
    return this.http
      .get<Descripobj>(`${this.API_URI}api/descripobj/oc/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObj(id: string): Observable<Descripobj> {
    return this.http
      .get<Descripobj>(`${this.API_URI}api/descripobj/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getObjTemplateLength(id: string): Observable<Descripobj> {
    return this.http
      .get<Descripobj>(`${this.API_URI}api/descripobj/length/${id}`)
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
