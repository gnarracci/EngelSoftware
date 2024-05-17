import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-active-documents',
  templateUrl: './active-documents.component.html',
  styleUrls: ['./active-documents.component.scss'],
})
export class ActiveDocumentsComponent implements OnInit {
  userLogged: any = {};

  userLoginOn: boolean = false;

  objsData: any = [];

  flds: any = [];

  model: any = [];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private objsService: ObjectsService,
  ) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getObjs();
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

  getObjs() {
    this.objsService.getObjs().subscribe(
      (res) => {
        this.objsData = res;
        console.log(this.objsData);
      },
    )
  }

  getObj(id: string) {
    this.objsService.getObjTemplate(id).subscribe(
      res => {
        this.model = res;
        console.log('MODEL', this.model);
      }
    )
  }

  checkfolders() {

  }

}