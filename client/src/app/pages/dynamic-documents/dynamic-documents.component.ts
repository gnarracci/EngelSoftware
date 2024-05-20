import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    private templateService: TemplatesService,
    private typesService: DataTypesService,
    private objService: ObjectsService
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

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
    this.getAllDatatypes();
    this.getAllObjs();
    this.getAllTempl();
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

  getTemplateName(id: string) {
    this.templateService.getNameTemplate(id).subscribe((res) => {
      this.dataTempl = res;
      console.log('TEMPLATENAME', this.dataTempl);
    });
  }
  saveFields() {
    if (!this.showField) {
      if (this.isField) {
        // Is only a Field
        this.fld = this.templForm.value;
        this.templateService.addField(this.selected, this.fld).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title:
                'Campo a sido agregado satisdactoriamente a la Hoja de Trabajo!',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(res);
            this.getAllTempl();
            this.templForm.reset();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
      } else {
        // Is a Field under Folder
        this.subfields = this.templForm.value;
        this.templateService
          .addFieldsWF(this.selected, this.subfields)
          .subscribe(
            (res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title:
                  'Campo agregado satisfactoriamente a la carpeta seleionada!',
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(res);
              this.getAllTempl();
              this.templForm.reset();
            },
            (err) => Swal.fire('Error!', 'Algp salio mal!', 'error')
          );
      }
    } else {
      // Is a Folder
      this.folder = this.templForm.value;
      this.templateService.addFolder(this.selected, this.folder).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:
              'La Carpeta a sido agregada a la hoja de trabajo seleccionada!',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res);
          this.getAllTempl();
          this.showField = false;
          this.templForm.reset();
        },
        (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
      );
    }
  }

  // Update Operations
  fillUpdateTemplate(id: string) {
    if (id !== null) {
      this.templateService.getTemplate(id).subscribe((data) => {
        this.templateForm.patchValue({
          label: data.label,
        });
      });
      this.edit = true;
      this.idc = id;
    }
  }

  updateTemplate() {
    this.templateData = this.templateForm.value;
    this.templateService.updateTemplate(this.idc, this.templateData).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Titulo de la Hoja de Trabajo a sido actualizada con exito!',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        this.getAllTempl();
        this.edit = false;
        this.templateForm.reset();
      },
      (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
    );
  }

  fillUpdateFolder(id: string) {
    if(id !== null) {
      this.templateService.getTemplate(id).subscribe(
        (data) => {
          console.log(data);
        }
      )
    }
  }

  fillUpdateFields(id: any) {
    if (id !== null) {
      console.log('IDFIELD', id)
    }
  }

  deleteFolder(id: string) {
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
        this.templateService.deleteFolder(id).subscribe(
          (res) => {
            console.log(res);
            this.getAllTempl();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
        Swal.fire(
          'Eliminado!',
          'La Carpeta seleccionada a sido eliminada!.',
          'success'
        );
      }
    });
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

  getAllObjs() {
    this.objService.getObjs().subscribe(
      (res: any) => {
        this.data = res;
        console.log('OBJS', this.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllTempl() {
    this.templateService.getAllTemplates().subscribe(
      (res) => {
        this.Templs = res;
        console.log('TEMPLS', this.Templs);
      },
      (error) => {
        console.log(error);
      }
    );
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
            this.getAllTempl();
            this.templateForm.reset();
          },
        });
    }
  }

  deleteModel(id: string) {
    Swal.fire({
      title: 'Esta usted Seguro?',
      text: 'Esta acccion no puede ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.templateService.deleteTemplate(id).subscribe(
          (res) => {
            console.log(res);
            this.getAllTempl();
          },
          (err) => Swal.fire('Error!', 'Algo salio mal!', 'error')
        );
        Swal.fire(
          'Eliminada!',
          'La Hoja de Trabajo seleccionada a sido eliminada!.',
          'success'
        );
      }
    });
  }
  reset() {
    this.templateForm.reset();
    this.templForm.reset();
  }
}
