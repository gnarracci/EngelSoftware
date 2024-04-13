import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Types } from '../interfaces/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTypesService {

  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://ppxmwzzx-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) { }

  getDataTypes(): Observable<Types> {
    return this.http.get<Types>(`${this.API_URI}api/types`).pipe(
      catchError(this.handlerError)
    );

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
