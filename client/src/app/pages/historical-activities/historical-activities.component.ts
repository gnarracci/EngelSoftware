import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { ObjdynService } from 'src/app/services/objdyn/objdyn.service';
import { UserService } from 'src/app/services/user/user.service';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

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

  deleteDyn(id:string) {
    Swal.fire({
      title: 'Esta usted seguro?',
      text: 'Esta accion no puede ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.objDyn.deleteDyn(id).subscribe(
          res => {
            console.log(res);
            this.getObjdyn();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
        Swal.fire(
          'Eliminado!',
          'La Hoja de Trabajo seleccionada a sido eliminada!.',
          'success'
        );
      }
    });
  }
 
  selHTD(id:string) {
    console.log(id)
  }
}
