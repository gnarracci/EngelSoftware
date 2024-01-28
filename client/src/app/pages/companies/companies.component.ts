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

  saveError: string = '';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companiesService: CompanyService
  ) {}

  // Declare getters for each input field
  get CompanyNameField() {
    return this.companyForm.get('name');
  }

  get PlantTypeField() {
    return this.companyForm.get('plant_type');
  }

  get PlantCodeField() {
    return this.companyForm.get('plant_code');
  }

  get PlantNameField() {
    return this.companyForm.get('plant_name');
  }

  get AddressField() {
    return this.companyForm.get('address');
  }

  get phoneField() {
    return this.companyForm.get('phone');
  }

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

  updateCompany(id: string ) {

  }

  deleteCompany(id: string ) {
    Swal.fire({
      title:'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        //Want Delete
        this.companiesService.deleteCompany(id).subscribe(
          res => {
            // console.log(res);
            this.getCompanies();
          },
          err => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'Company selected has been deleted!.', 'success')
      }
    })
  }


}
