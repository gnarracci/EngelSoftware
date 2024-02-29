import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit{

  userLogged: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataUser();
  }

  dataUser() {
    this.userService.getProfile().subscribe(
      res => {
        this.userLogged = res;
        console.log('USER', this.userLogged);
      }
    )
  }
}
