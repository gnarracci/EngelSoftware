import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/roles/role.service';
import { CompanyService } from 'src/app/services/company/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;

  roleForm!: FormGroup;

  userLogged: any = {};

  userLoginOn: boolean = false;

  totalUsers: any = {};

  totalRoles: any = {};

  totalCompanies: any = {};

  userData: any = {};

  roleData: any = {};

  edit: boolean = false;

  idc: string = '';

  saveError: string = '';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
    });

    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getAllUsers();
    this.getAllRoles();
    this.getAllCompanies();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      (res) => {
        this.userLogged = res;
        console.log('user: ', this.userLogged);
      },
      (err) => console.error(err)
    );
  }

  matchpassword(control: FormControl) {
    let password = control.root.get('password');
    console.log('REPAS', password);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.totalUsers = res;
        console.log('users: ', this.totalUsers);
      },
      (err) => console.error(err)
    );
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe((res) => {
      this.totalRoles = res;
      console.log('roles: ', this.totalRoles);
    });
  }

  getAllCompanies() {
    this.companyService.getCompanies().subscribe((res) => {
      this.totalCompanies = res;
      console.log('companies', this.totalCompanies);
    });
  }

  saveUser() {
    console.log('FORM', this.userForm.value);
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe({
        next: (userData) => {
          // console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.saveError = errorData;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops',
            text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User Saved Successfully!',
            showConfirmButton: false,
            timer: 1300,
          });

          this.userForm.reset();
          this.getAllUsers();
        },
      });
    }
  }

  public fillUpdateUser(id: string) {
    if (id !== null) {
      this.userService.getUser(id).subscribe((data) => {
        this.userForm.patchValue({
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          role: data.role[0],
          company: data.company[0],
        });
        console.log(this.userForm.value);
        this.edit = true;
        this.idc = id;
      });
    }
  }

  updateUser() {
    this.userData = this.userForm.value;
    this.userService.updateUser(this.idc, this.userData).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User selected has been updated!',
          showConfirmButton: false,
          timer: 1300,
        });
        console.log(res);
        this.getAllUsers();
        this.userForm.reset();
      },
      (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
    );
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.userService.deleteUser(id).subscribe(
          (res) => {
            console.log(res);
            this.getAllUsers();
            this.userForm.reset();
          },
          (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'User selected has been deleted!.', 'success');
      }
    });
  }

  reset() {
    if (this.userForm.valid) {
      this.userForm.reset();
    }
  }

  saveRole() {
    console.log('FORMROLE: ', this.roleForm.value);
    if (this.roleForm.valid) {
      this.roleService.save(this.roleForm.value).subscribe({
        next: (roleData) => {
          console.log(roleData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.saveError = errorData;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops',
            text: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Role Saved Successfully!',
            showConfirmButton: false,
            timer: 1300,
          });
          this.resetRole();
          this.getAllRoles();
        },
      });
    }
  }

  public fillUpdateRole(id: string) {
    if (id !== null) {
      this.roleService.getRole(id).subscribe((data) => {
        this.roleForm.patchValue({
          name: data.name,
        });
        console.log(this.roleForm.value);
        this.edit = true;
        this.idc = id;
      });
    }
  }

  updateRole() {
    this.roleData = this.roleForm.value;
    this.roleService.updateRoles(this.idc, this.roleData).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Role selected has been updated!',
          showConfirmButton: false,
          timer: 1300,
        });
        console.log(res);
        this.getAllRoles();
        this.roleForm.reset();
      },
      (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
    );
  }

  deleteRoles(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.roleService.deleteRoles(id).subscribe(
          (res) => {
            console.log(res);
            this.getAllRoles();
            this.resetRole();
          },
          (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'Role selected has been deleted!.', 'success');
      }
    });
  }

  resetRole() {
    if (this.roleForm.valid) {
      this.roleForm.reset();
    }
  }
}
