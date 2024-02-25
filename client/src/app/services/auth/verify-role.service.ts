import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Roles } from 'src/app/interfaces/roles';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class VerifyRoleService {

  public userRole: any = {};

  constructor(private userService: UserService) { }

  getUserRole() {
    this.userService.roleType().subscribe(
      res => {
        this.userRole = res;
        console.log('USERROLE', this.userRole);
      }
    )  
  }

  public isAuthorized() {
    if(this.userRole != '') return true;
  }

}
