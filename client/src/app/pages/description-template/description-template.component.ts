import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { DataTypesService } from 'src/app/services/data-types.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-description-template',
  templateUrl: './description-template.component.html',
  styleUrls: ['./description-template.component.scss'],
})
export class DescriptionTemplateComponent implements OnInit {
  userLogged: any = [];

  companyData: any = [];

  dataType: any = [];

  objs: any = [];

  obj: any = [];

  Templs: any = [];

  data: any = [];

  dataTempl: any = [];

  showForm: Boolean = false;

  showField: Boolean = false;

  isField: Boolean = false;

  selected: string = '';

  selectedFolder: any = '';

  folder: any = '';

  subfields: any = [];

  fld: any = [];

  len: any;

  idc: string = '';

  edit = false;

  templateData: any = {};

  saveError: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private typesService: DataTypesService
  ) {}

  templateForm = this.formBuilder.group({
    label: ['', [Validators.required, Validators.minLength(3)]],
  });

  templForm = this.formBuilder.group({
    fld_name: ['', [Validators.required, Validators.minLength(3)]],
    is_container: [null],
    label: ['', [Validators.required]],
    order: [''],
    type: [''],
    requ: [null],
    par: [''],
  });

  // Getters

  get fld_name() {
    return this.templForm.controls.fld_name;
  }

  get label() {
    return this.templForm.controls.label;
  }

  selectedTempl(id: string) {
    this.selected = id;
    console.log('SELECTED', id);
  }

  selectedFd(id: any) {
    this.selectedFolder = id + 1;
    console.log('SELFOLDER', id);
  }

  showForml() {
    if (this.dataTempl.length > 0) {
      this.showForm = true;
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Oops',
        text: 'Usted debe seleccionar una Hoja de Trabajo!',
        showConfirmButton: false,
        timer: 1300,
      });
    }
  }

  onChange(event: any) {
    this.showField = event.target.checked;
    console.log(this.showField);
  }

  isOnlyField(event: any) {
    this.isField = event.target.checked;
  }

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
    this.getAllDatatypes();
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

  getAllDatatypes() {
    this.typesService.getDataTypes().subscribe((res) => {
      this.dataType = res;
      // console.log('TYPES', this.dataType);
    });
  }
}
