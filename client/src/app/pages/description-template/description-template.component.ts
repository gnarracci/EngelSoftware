import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-description-template',
  templateUrl: './description-template.component.html',
  styleUrls: ['./description-template.component.scss']
})
export class DescriptionTemplateComponent  implements OnInit{

  userLogged: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataUser();
  }

  dataUser() {
    this.userService.getProfile().subscribe((res) => {
      this.userLogged = res;
      // console.log('User', this.userLogged);
    });
  }

}
