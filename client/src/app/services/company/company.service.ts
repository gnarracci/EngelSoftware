import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Companies } from 'src/app/interfaces/companies';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  API_URI = 'http://localhost:5000/';
  //API_URI = 'https://3j5c3z51-5000.use2.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  save(data: Companies): Observable<Companies> {
    return this.http
      .post<Companies>(`${this.API_URI}api/companies`, data)
      .pipe(catchError(this.handlerError));
  }

  getCompanies(): Observable<Companies> {
    return this.http
      .get<Companies>(`${this.API_URI}api/companies`)
      .pipe(catchError(this.handlerError));
  }

  getCompany(id: string): Observable<Companies> {
    return this.http
      .get<Companies>(`${this.API_URI}api/companies/${id}`)
      .pipe(catchError(this.handlerError));
  }

  updateCompany(id: string, updatedCompany: Companies): Observable<Companies> {
    return this.http
      .put<Companies>(`${this.API_URI}api/companies/${id}`, updatedCompany)
      .pipe(catchError(this.handlerError));
  }

  deleteCompany(id: string): Observable<Companies> {
    return this.http
      .delete<Companies>(`${this.API_URI}api/companies/${id}`)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error has occurrred', error.error);
    } else {
      console.error('Server return status code', error.status, error.error);
    }
    return throwError(
      () => new Error('Something went wrong, please try again')
    );
  }
}
