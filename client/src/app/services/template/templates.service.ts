import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Obj } from 'src/app/interfaces/objects';
import { Template } from 'src/app/interfaces/template';
import { Types } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  saveTemp(data: Template): Observable<Template> {
    return this.http
      .post<Template>(`${this.API_URI}api/dynamics`, data)
      .pipe(catchError(this.handlerError));
  }

  getAllDatatypes(): Observable<Types> {
    return this.http
      .get<Types>(`${this.API_URI}api/types`)
      .pipe(catchError(this.handlerError));
  }

  getAllTemplates(): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics`)
      .pipe(catchError(this.handlerError));
  }

  getTemplate(id: string): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics/${id}`)
      .pipe(catchError(this.handlerError));
  }

  getNameTemplate(id: string): Observable<Template> {
    return this.http
      .get<Template>(`${this.API_URI}api/dynamics/nt/${id}`)
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
