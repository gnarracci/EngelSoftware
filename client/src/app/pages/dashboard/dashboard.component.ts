import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  userLogged: any = {}

  userLoginOn: boolean = false;

  roleType: any = {};

  constructor(private loginService: LoginService, private userService: UserService) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.rol();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      res => {
        this.userLogged = res;
        //console.log(res);
      },
      err => console.error(err)
    );
  }

  rol() {
    this.userService.roleType().subscribe(
      res => {
        this.roleType = res;
        //console.log(res);
      }
    )
  }
}
