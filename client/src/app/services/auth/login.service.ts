import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interfaces/login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(credentials:LoginRequest) {
    console.log(credentials)
  }
}
