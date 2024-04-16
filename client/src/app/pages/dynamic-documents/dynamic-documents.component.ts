import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Template } from 'src/app/interfaces/template';
import { CompanyService } from 'src/app/services/company/company.service';
import { DataTypesService } from 'src/app/services/data-types.service';
import { ObjectsService } from 'src/app/services/objects/objects.service';
import { TemplatesService } from 'src/app/services/template/templates.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dynamic-documents',
  templateUrl: './dynamic-documents.component.html',
  styleUrls: ['./dynamic-documents.component.scss'],
})
export class DynamicDocumentsComponent implements OnInit {

  userLogged: any = [];

  companyData: any = [];

  dataType: any = [];

  objs: any = [];

  obj: any = [];

  Templs: any = [];

  data: any = [];

  dataTempl: any = [];

  showForm: Boolean = false;

  showField: any

  saveError: string = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private templateService: TemplatesService,
    private typesService: DataTypesService,
    private objService: ObjectsService
  ) {}

  templateForm = this.formBuilder.group({
    label: ['', [Validators.required, Validators.minLength(3)]],
  });

  templForm = this.formBuilder.group({
    fld_name: ['', [Validators.required, Validators.minLength(4)]],
    is_container: [null],
    label: ['', [Validators.required]],
    order: [''],
    type: [''],
    requ: [null],
    par: ['']
  });

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
    this.getAllDatatypes();
    this.getAllObjs();
    this.getAllTempl();
  }

  selectedTempl(id: string) {
    console.log('SELECTED', id)
  }

  showForml() {
    if(this.dataTempl.length > 0) {
      this.showForm = true;
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Oops',
        text: 'You must select a template!',
        showConfirmButton: false,
        timer: 1300,
      });
    }
  }

  onChange(event: any) {
    this.showField = event.target.checked
  }

  getTemplateName(id: string) {    
    this.templateService.getNameTemplate(id).subscribe(res => {
      this.dataTempl = res;
      console.log('ONE TEMPLATE', this.dataTempl);
    })
  }

  saveFields() {
    console.log(this.templForm.value);

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
      console.log('TYPES', this.dataType);
    });
  }

  getAllObjs() {
    this.objService.getObjs().subscribe(
      (res: any) => {
        this.objs = res;
        console.log('OBJS', this.objs);
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllTempl() {
    this.templateService.getAllTemplates().subscribe(
      res => {
        this.Templs = res;
        console.log('TEMPLS', this.Templs);
      },
      error => {
        console.log(error);
      }
    )
  }

  saveNewModel() {
    if (this.templateForm.valid) {
      this.templateService
        .saveTemp(this.templateForm.value as Template)
        .subscribe({
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
              text: 'Something went wrong!',
              showConfirmButton: false,
              timer: 1300,
            });
          },
          complete: () => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Saved Successfully!',
              showConfirmButton: false,
              timer: 1300,
            });
            this.getAllTempl();
            this.templateForm.reset();
          },
        });
    }
  }


  reset() {
    this.templateForm.reset();
    this.templForm.reset();
  }
}
