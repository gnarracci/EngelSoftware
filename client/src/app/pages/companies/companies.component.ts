import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Companies } from 'src/app/interfaces/companies';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  userLogged: any = {};

  userLoginOn: boolean = false;

  companiesData: any = {};

  saveError: string = '';

  companyForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    plant_type: ['', [Validators.required, Validators.minLength(3)]],
    plant_code: ['', [Validators.required, Validators.minLength(3)]],
    plant_name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companiesService: CompanyService
  ) {}
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getCompanies();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      (res) => {
        this.userLogged = res;
        //console.log(res);
      },
      (err) => console.error(err)
    );
  }

  saveCompany() {
    if (this.companyForm.valid) {
      this.companiesService.save(this.companyForm.value as Companies).subscribe({
        next: (companyData) => {
          //console.log(companyData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.saveError = errorData;
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops",
            text: "Something went wrong!",
            showConfirmButton: false,
            timer: 1000
          })
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Saved Successfully!',
            showConfirmButton: false,
            timer: 1000
          })
          this.companyForm.reset();
          this.getCompanies();
        }
      })
    }
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
      (res) => {
        this.companiesData = res;
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  updCompany() {

  }

  delCompany() {

  }


}
