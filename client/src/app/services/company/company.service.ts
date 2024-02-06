import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Companies } from 'src/app/interfaces/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  save(data: Companies): Observable<Companies> {
    return this.http.post<Companies>(`${this.API_URI}api/companies`, data).pipe(
      catchError(this.handlerError)
    )
  }

  getCompanies(): Observable<Companies> {
    return this.http.get<Companies>(`${this.API_URI}api/companies`).pipe(
      catchError(this.handlerError)
    )
  };

  getCompany(id: string): Observable<Companies> {
    return this.http.get<Companies>(`${this.API_URI}api/companies/${id}`).pipe(
      catchError(this.handlerError)
    )
  }

  updateCompany(id: string, updatedCompany: Companies): Observable<Companies> {
    return this.http.put<Companies>(`${this.API_URI}api/companies/${id}`, updatedCompany).pipe(
      catchError(this.handlerError)
    )
  };

  deleteCompany(id: string): Observable<Companies> {
    return this.http.delete<Companies>(`${this.API_URI}api/companies/${id}`).pipe(
      catchError(this.handlerError)
    )
  };

  private handlerError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error("Se a producido un error", error.error)
    } else {
      console.error("Backend retorno el codigo de estado", error.status, error.error)
    }
    return throwError(() => new Error('Algo fallo, por favor intente nuevamente'));
  }
}
