import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  userLogged: any = {};

  userLoginOn: boolean = false;

  constructor(private loginService: LoginService, private userService: UserService) {}
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
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

}
