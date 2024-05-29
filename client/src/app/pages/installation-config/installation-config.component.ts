import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Descripobj } from 'src/app/interfaces/descripobj';
import { Obj } from 'src/app/interfaces/objects';
import { CompanyService } from 'src/app/services/company/company.service';
import { DescripobjService } from 'src/app/services/descripObj/descripobj.service';
import { DescripTempService } from 'src/app/services/descriptiontemplate/descrip-temp.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { TemplatesService } from 'src/app/services/template/templates.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installation-config',
  templateUrl: './installation-config.component.html',
  styleUrls: ['./installation-config.component.scss'],
})
export class InstallationConfigComponent implements OnInit {
  userLogged: any = [];

  objs: any = [];

  desobjs: any = [];

  templs: any = [];

  destempls: any = [];

  companyData: any = [];

  selectedAdm: any = "";

  saveError: string = '';

  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private objsService: ObjectsService,
    private templateService: TemplatesService,
    private companyService: CompanyService,
    private descripObj: DescripobjService,
    private descripTem: DescripTempService,
    private router: Router
  ) {}

  objForm = this.formbuilder.group({
    code: ['', [Validators.required, Validators.minLength(4)]],
    descrip: ['', [Validators.required]],
    company_name: [''],
    adm: [''],
    label: [''],
  });

  objForm2 = this.formbuilder.group({
    code: ['', [Validators.required, Validators.minLength(4)]],
    descrip: ['', [Validators.required]],
    company_name: [''],
    adm: [''],
    label: [''],
  });

  ngOnInit(): void {
    this.dataUser();
    this.getAllObjs();
    this.getAllDescripObjs();
    this.getTemplates();
    this.getDesTemp();
    this.getCompanies();
  }

  getAllObjs() {
    this.objsService.getObjs().subscribe((res) => {
      this.objs = res;
      console.log('OBJS', this.objs);
    });
  }

  getAllDescripObjs() {
    this.descripObj.getObjs().subscribe(
      res => {
        this.desobjs = res;
        console.log('DESOBJS', this.desobjs);
      }
    )
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res) => {
      this.companyData = res;
      // console.log('COMPANIES', this.companyData);
    });
  }

  getTemplates() {
    this.templateService.getAllTemplates().subscribe(
      res => {
        this.templs = res;
        console.log('TEMPLATES', this.templs);
      }
    )
  }

  getDesTemp() {
    this.descripTem.getAllTemplates().subscribe(
      res => {
        this.destempls = res;
        console.log('DESTEMPLS', this.destempls);
      }
    )
  }

  saveObj() {
    if (this.objForm.valid) {
      this.objsService.saveObjs(this.objForm.value as Obj).subscribe({
        next: (res) => {
          // console.log(res);
        },
        error: (errorData) => {
          console.error(errorData);
          this.saveError = errorData;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops',
            text: 'Algo salio mal!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Objeto Guardado satisfactoriamente!',
            showConfirmButton: false,
            timer: 1500,
          });

          this.objForm.reset();
          this.router.navigate(['/installations']);
        },
      });
    }
  }

  saveDescripObj() {
    if (this.objForm2.valid) {
      this.descripObj.saveObjs(this.objForm2.value as Descripobj).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (errorData) => {
          console.error(errorData);
          this.saveError = errorData;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops',
            text: 'Algo salio mal!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Objeto Guardado satisfactoriamente!',
            showConfirmButton: false,
            timer: 1500,
          });

          this.objForm2.reset();
          this.router.navigate(['/installations']);
        },
      });
    }
  }

  dataUser() {
    this.userService.getProfile().subscribe((res) => {
      this.userLogged = res;
      // console.log('User', this.userLogged);
    });
  }

  reset() {
    this.objForm.reset();
  }

  reset2() {
    this.objForm2.reset();
  }
}
