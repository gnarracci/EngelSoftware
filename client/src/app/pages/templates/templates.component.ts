import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit{

  userLogged: any = {};

  companyData: any = {};

  constructor(private userService: UserService, private companyServie: CompanyService) {}

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      res => {
        this.userLogged = res;
        console.log('Company', this.userLogged.company[0].name);
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
}
