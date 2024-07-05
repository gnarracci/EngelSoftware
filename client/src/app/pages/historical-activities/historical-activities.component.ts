import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { ObjdynService } from 'src/app/services/objdyn/objdyn.service';
import { UserService } from 'src/app/services/user/user.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-historical-activities',
  templateUrl: './historical-activities.component.html',
  styleUrls: ['./historical-activities.component.scss'],
})
export class HistoricalActivitiesComponent implements OnInit {
  userLogged: any = {};

  userLoginOn: boolean = false;

  HTD: any = [];

  HTE: any = [];

  DynInfo: any = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private objDyn: ObjdynService
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getObjdyn();
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

  getObjdyn() {
    this.objDyn.getObjdyn().subscribe((res) => {
      this.HTD = res;
      console.log(res);
    });
  }

  getOnedyn(id:string) {
    this.objDyn.getOnedyn(id).subscribe(
      res => {
        this.DynInfo = res;
        console.log(res);
      }
    )        
  }

  genPDF() {
    let doc = new jsPDF();
    this.DynInfo.forEach((element: any) => {
      doc.text(`ID: ${element.pdfData.company}`, 10, 10);
    });
    doc.save('hojadetrabajo.pdf');
  }
}
