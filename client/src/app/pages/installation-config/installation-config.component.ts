import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Obj } from 'src/app/interfaces/objects';
import { CompanyService } from 'src/app/services/company/company.service';
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

  templs: any = [];

  companyData: any = [];

  selectedAdm: any = "";

  saveError: string = '';

  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private objsService: ObjectsService,
    private templateService: TemplatesService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  objForm = this.formbuilder.group({
    code: ['', [Validators.required, Validators.minLength(4)]],
    descrip: ['', [Validators.required]],
    company: ['', [Validators.required]],
    adm: [''],
    label: [''],
  });

  ngOnInit(): void {
    this.dataUser();
    this.getAllObjs();
    this.getTemplates();
    this.getCompanies();
  }

  getAllObjs() {
    this.objsService.getObjs().subscribe((res) => {
      this.objs = res;
      console.log('OBJS', this.objs);
    });
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

          this.objForm.reset();
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
}
