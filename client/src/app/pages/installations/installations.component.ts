import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.scss'],
})
export class InstallationsComponent implements OnInit {
  userLogged: any = [];

  companyData: any = [];

  objData: any = [];

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private objService: ObjectsService
  ) {}
  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
    this.getObjs();
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

  getObjs() {
    this.objService.getObjs().subscribe(
      res => {
        this.objData = res;
        console.log('OBJS', this.objData);
      }
    )
  }
}
