import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-installation-config',
  templateUrl: './installation-config.component.html',
  styleUrls: ['./installation-config.component.scss']
})
export class InstallationConfigComponent implements OnInit{

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
