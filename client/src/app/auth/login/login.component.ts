import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginError:string = '';

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {}

  get user() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as User).subscribe({
        next: (userData) => {
          // console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops",
            text: "Algo salio mal!",
            showConfirmButton: false,
            timer: 1500
          })
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de Sesion Exitoso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
