import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Objdyn } from 'src/app/interfaces/objdyn';

@Injectable({
  providedIn: 'root',
})
export class ObjdynService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://3j5c3z51-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  saveObjdyn(data: Objdyn): Observable<Objdyn> {
    return this.http
      .post<Objdyn>(`${this.API_URI}api/objdyn`, data)
      .pipe(catchError(this.handlerError));
  }

  getObjdyn(): Observable<Objdyn> {
    return this.http
      .get<Objdyn>(`${this.API_URI}api/objdyn`)
      .pipe(catchError(this.handlerError));
  }

  getOnedyn(id: string): Observable<Objdyn> {
    return this.http
      .get<Objdyn>(`${this.API_URI}api/objdyn/${id}`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Un error a ocurrido', error.error);
    } else {
      console.error(
        'Servidor retorno estatus de codigo',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo salio mal, por favor intente nuevamente')
    );
  }
}
