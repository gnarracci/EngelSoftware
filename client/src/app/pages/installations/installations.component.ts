import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.scss'],
})
export class InstallationsComponent implements OnInit {
  userLogged: any = [];

  companyData: any = [];

  objData: any = [];

  filterObjs = "";

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private objService: ObjectsService
  ) {}
  ngOnInit(): void {
    this.dataUser();
    this.getObjs();
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

  getObjs() {
    this.objService.getObjs().subscribe(
      res => {
        this.objData = res;
        console.log('OBJS', this.objData);
      }
    )
  }

  deleteObj(id: string) {
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
        this.objService.deleteObj(id).subscribe(
          (res) => {
            console.log(res);
            this.getObjs();
          },
          (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'Object selected has been deleted!.', 'success');
      }
    });
  }

}