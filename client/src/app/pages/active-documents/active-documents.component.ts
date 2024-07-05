import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { ObjdynService } from 'src/app/services/objdyn/objdyn.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-active-documents',
  templateUrl: './active-documents.component.html',
  styleUrls: ['./active-documents.component.scss'],
})
export class ActiveDocumentsComponent implements OnInit {

  userLogged: any = {};

  userLoginOn: boolean = false;

  formData: any = {};

  formPpal: any = {};

  objsData: any = [];

  objInfo: any = [];

  flds: any = [];

  model: any = [];

  modelsaved: any = [];

  str: any = [];

  objComp: any = [];

  filterProperty = '';

  properties!: string;

  longer: any;

  showForm: any;

  value: any = [];

  itemsArray: any;

  saveError: string = '';

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private objsService: ObjectsService,
    private formBuilder: FormBuilder,
    private objDyn: ObjdynService
  ) {}

  tForm = this.formBuilder.group({
    code: [''],
    adm: [''],
    company: [''],
    plant_name: [''],
    plant_type: [''],
    plant_code: [''],
  });
  
  

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.dataUser();
    this.getObjs();
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

  saveTemplate(): void {
    console.log('TFORM1', this.tForm.value);
    console.log('TFORM2', this.formData)
    this.formPpal = this.tForm.value;
    const uni = {...this.formPpal, ...this.formData};
    console.log('uni', uni);
    this.objDyn.saveObjdyn(uni).subscribe({
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
          timer: 1300,
        });
      },
      complete: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hoja de Trabajo guardada satisfactoriamente!',
          showConfirmButton: false,
          timer: 1300,
        });
        this.tForm.reset();
        this.formData = {};    
      },
    })
  }

  getObjs() {
    this.objsService.getObjs().subscribe(
      (res) => {
        this.objsData = res;
        console.log(this.objsData);
      },
    )
  }

  getObjTemplate(id: string) {
    this.objsService.getObjTemplate(id).subscribe(
      res => {
        this.model = res;
        localStorage.setItem("adm", JSON.stringify(this.model.folders))
        console.log('MODEL', this.model);
      }
    )
  }

  getLocalSto() {
    let template = JSON.parse(localStorage.getItem("adm") || "");
    this.modelsaved = template;
    this.formData = {};
    console.log('TEMPLATE', template);
  }

  getObj(id: string) {
    this.objsService.getObj(id).subscribe(
        res => {
        this.objInfo = res;
        console.log('OBJECT', this.objInfo);
      }
    )
  }
  getObjComp(id: string) {
    this.objsService.getObjCompany(id).subscribe(
      res => {
        this.objComp = res;
        console.log('OBJCOMP', this.objComp);
      }
    )
  }

  getTemplateLength(id: string) {
    this.objsService.getObjTemplateLength(id).subscribe(
      res => {
        this.longer = res;
        console.log('LONGER', this.longer);
        this.templateForm();
      }
    )
  }

  templateForm() {
    if(this.longer <= 2) {
      this.showForm = true;
      console.log(this.showForm)
    } else {
      this.showForm = false;
      console.log(this.showForm)
    }
  }

}
