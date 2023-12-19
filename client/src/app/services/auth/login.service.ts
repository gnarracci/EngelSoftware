import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  login(credentials: User):Observable<any> {
    return this.http.post(`${this.API_URI}/api/auth/signin`, credentials);
  }
}
