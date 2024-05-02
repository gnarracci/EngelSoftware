import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  companyData: any = {};

  edit = false;

  idc: string = '';

  saveError: string = '';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companiesService: CompanyService
  ) {}

  companyForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    plant_type: ['', [Validators.required, Validators.minLength(3)]],
    plant_code: ['', [Validators.required, Validators.minLength(3)]],
    plant_name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.minLength(5)]],
  });
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
      this.companiesService
        .save(this.companyForm.value as Companies)
        .subscribe({
          next: (companyData) => {
            // console.log(companyData);
          },
          error: (errorData) => {
            console.error(errorData);
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
              title: 'Saved Successfully!',
              showConfirmButton: false,
              timer: 1300,
            });

            this.companyForm.reset();
            this.getCompanies();
          },
        });
    }
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
      (res) => {
        this.companiesData = res;
        // console.log(res);
      },
      (err) => console.error(err)
    );
  }

  public fillUpdateCompany(id: string) {
    if (id !== null) {
      this.companiesService.getCompany(id).subscribe((data) => {
        this.companyForm.patchValue({
          name: data.name,
          plant_type: data.plant_type,
          plant_code: data.plant_code,
          plant_name: data.plant_name,
          address: data.address,
          phone: data.phone,
        });
        this.edit = true;
        this.idc = id;
      });
    }
  }

  updateCompany() {
    this.companyData = this.companyForm.value;
    this.companiesService.updateCompany(this.idc, this.companyData).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Company selected has been updated!',
          showConfirmButton: false,
          timer: 1300,
        });
        console.log(res);
        this.getCompanies();
        this.companyForm.reset();
      },
      (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
    );
  }

  deleteCompany(id: string) {
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
        this.companiesService.deleteCompany(id).subscribe(
          (res) => {
            console.log(res);
            this.getCompanies();
            this.companyForm.reset();
          },
          (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'Company selected has been deleted!.', 'success');
      }
    });
  }
  reset() {
    if (this.companyForm.valid) {
      this.companyForm.reset();
      this.edit = false;
    }
  }
}
