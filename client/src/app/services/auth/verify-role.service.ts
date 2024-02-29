import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyRoleService {

  public user: any = '';

  public userRole: any = '';

  constructor(private userService: UserService) { }

  public getUserRole() {
    this.userService.roleType().subscribe(
      res => {
        this.userRole = res;
        console.log('USERROLE', this.userRole);
      }
    )  
  }

  public getUserName() {
    this.userService.userType().subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      }
    )
  }
}
