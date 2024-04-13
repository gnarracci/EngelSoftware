import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { Template } from 'src/app/interfaces/template';
import { CompanyService } from 'src/app/services/company/company.service';
import { DataTypesService } from 'src/app/services/data-types.service';
import { TemplatesService } from 'src/app/services/template/templates.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dynamic-documents',
  templateUrl: './dynamic-documents.component.html',
  styleUrls: ['./dynamic-documents.component.scss'],
})
export class DynamicDocumentsComponent implements OnInit {
  loading: boolean = false;

  files!: TreeNode[];

  userLogged: any = [];

  companyData: any = [];

  dataType: any = [];

  saveError: string = '';
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private templateService: TemplatesService,
    private typesService: DataTypesService
  ) {}

  templateForm = this.formBuilder.group({
    label: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
    this.getAllDatatypes();
    this.loading = true;
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

            this.templateForm.reset();
          },
        });
    }
  }
}
