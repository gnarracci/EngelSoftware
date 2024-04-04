import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.scss']
})
export class InstallationsComponent implements OnInit{

  userLogged: any = [];

  companyData: any = [];

  constructor(private userService: UserService, private companyService: CompanyService) { }
ngOnInit(): void {
  this.dataUser();
  this.getCompanies();
}

dataUser() {
  this.userService.getProfile().subscribe((res) => {
    this.userLogged = res;
    // console.log('User', this.userLogged);
  });
}

getCompanies() {
  this.companyService.getCompanies().subscribe((res) => {
    this.companyData = res;
    // console.log('COMPANIES', this.companyData);
  });
}

}
