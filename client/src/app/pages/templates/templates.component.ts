import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit{

  userLogged: any = {};

  companyData: any = [];

  constructor(private userService: UserService, private companyServie: CompanyService, private formBuilder: FormBuilder) {}

  template1 = this.formBuilder.group({
    companies:['', [Validators.required]]   
  })

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      res => {
        this.userLogged = res;
        console.log('User', this.userLogged);
      }
    )
  }

  getCompanies() {
    this.companyServie.getCompanies().subscribe(
      res => {
        this.companyData = res;
        console.log('COMPANIES', this.companyData);
      }
    )
  }

  getCom() {
    
  }

}