import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Companies } from 'src/app/interfaces/companies';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  save(data: Companies): Observable<Companies> {
    //console.log(data)
    return this.http.post<Companies>(`${this.API_URI}api/companies`, data)
  }

  getCompanies(): Observable<Companies> {
    return this.http.get<Companies>(`${this.API_URI}api/companies`)
  };

  updateCompany(id: string, updatedCompany: Companies): Observable<Companies> {
    return this.http.put<Companies>(`${this.API_URI}api/companies${id}`, updatedCompany)
  };

  deleteCompany(id: string): Observable<Companies> {
    return this.http.delete<Companies>(`${this.API_URI}api/companies/${id}`)
  };
}
