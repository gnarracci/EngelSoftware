import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/roles/role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userLogged: any = {};

  userLoginOn: boolean = false;

  totalUsers: any = {};

  totalRoles: any = {};

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {}

  userForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['', [Validators.required, Validators.minLength(4)]],
    company: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getAllUsers();
    this.getAllRoles();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      res => {
        this.userLogged = res;
        console.log('user: ', this.userLogged)
      },
      (err) => console.error(err)
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.totalUsers = res;
        console.log('users: ', this.totalUsers);
      },
      (err) => console.error(err)
    );
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe(
      res => {
        this.totalRoles = res;
        console.log('roles: ',this.totalRoles);
      }
    )
  }

  reset() {
    if (this.userForm.valid) {
      this.userForm.reset();
    }
  }
}
