import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { DescripobjService } from 'src/app/services/descripObj/descripobj.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.scss'],
})
export class InstallationsComponent implements OnInit {
  userLogged: any = [];

  companyData: any = [];

  objData: any = [];

  desobjData: any = [];

  filterObjs = "";

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private objService: ObjectsService,
    private desObjsService: DescripobjService
  ) {}
  ngOnInit(): void {
    this.dataUser();
    this.getObjs();
    this.getCompanies();
    this.getDesObjs();
  }

  dataUser() {
    this.userService.getProfile().subscribe((res) => {
      this.userLogged = res;
      // console.log('User', this.userLogged);
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res) => {
      this.companyData = res;
      // console.log('COMPANIES', this.companyData);
    });
  }

  getObjs() {
    this.objService.getObjs().subscribe(
      res => {
        this.objData = res;
        console.log('OBJS', this.objData);
      }
    )
  }

  getDesObjs() {
    this.desObjsService.getObjs().subscribe(
      res => {
        this.desobjData = res;
        console.log('DESOBJS', this.desobjData);
      }
    )
  }

  deleteObj(id: string) {
    Swal.fire({
      title: 'Esta usted seguro?',
      text: "Esta accion no puede ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.objService.deleteObj(id).subscribe(
          (res) => {
            console.log(res);
            this.getObjs();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
        Swal.fire('Eliminado!', 'El Objeto seleccionado a sido eliminado!.', 'success');
      }
    });
  }

  deleteDesObj(id: string) {
    Swal.fire({
      title: 'Esta usted seguro?',
      text: "Esta accion no puede ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.desObjsService.deleteObj(id).subscribe(
          (res) => {
            console.log(res);
            this.getDesObjs();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
        Swal.fire('Eliminado!', 'El Objeto seleccionado a sido eliminado!.', 'success');
      }
    });
  }

}