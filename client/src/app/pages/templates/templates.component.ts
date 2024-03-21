import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
import { TemplatesService } from 'src/app/services/template/templates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {

  template!: FormGroup;

  fields!: FormGroup;
  
  userLogged: any = {};

  companyData: any = [];

  objData: any = [];
  
  objGrl: any = [];

  userCompany: any = '';

  dataType: any = [];

  saveError: string = '';

  constructor(
    private userService: UserService,
    private companyServie: CompanyService,
    private formBuilder: FormBuilder,
    private temp: TemplatesService
  ) {}  

  ngOnInit(): void {
  this.template = this.formBuilder.group({
    companies: new FormControl('', Validators.compose([Validators.required])),
    name: new  FormControl('', Validators.compose([Validators.required])),
    type_obj: new FormControl('', Validators.compose([Validators.required]))
  });
  this.fields = this.formBuilder.group({
    name: new FormControl('', Validators.compose([Validators.required])),
    container: new FormControl(false, Validators.compose([Validators.required])),
    order: new FormControl(null, Validators.compose([Validators.required])),
    type: new FormControl('', Validators.compose([Validators.required])),
    evtitle: new FormControl(false, Validators.compose([Validators.required])),
    req: new FormControl(false, Validators.compose([Validators.required])),
    temp: new FormControl('', Validators.compose([Validators.required])),
    par: new FormControl('', Validators.compose([Validators.required]))
  })
  
    this.dataUser();
    this.getCompanies();
    this.getAllDatatypes();
    this.getAllObj();
    this.userCompany = this.userLogged.company[0].name;
  }

  dataUser() {
    this.userService.getProfile().subscribe((res) => {
      this.userLogged = res;
      // console.log('User', this.userLogged);
    });
  }

  getCompanies() {
    this.companyServie.getCompanies().subscribe((res) => {
      this.companyData = res;
      // console.log('COMPANIES', this.companyData);
    })
  };

  getAllDatatypes() {
    this.temp.getAllDatatypes().subscribe(
      res => {
        this.dataType = res;
        // console.log('TYPES', this.dataType);
      }
    )
  }

  saveObj() {
    const build_user = this.userLogged.username;
    const edit_user = this.userLogged.username;
    const val = this.template.value;
    const newObj = {build_user, edit_user,...val};
    if(this.template.valid) {
      this.temp.saveObj(newObj).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
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
            title: 'Template was saved Successfully!',
            showConfirmButton: false,
            timer: 1300,
          });
          this.template.reset();
          this.getAllObj();
        },
      })
    }
  }

  deleteTemplate(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        //Want Delete
        this.temp.deleteObj(id).subscribe(
          (res) => {
            console.log(res);
            this.getAllObj();
            this.template.reset();
          },
          (err) => Swal.fire('Error!', 'Something went wrong!', 'error')
        );
        Swal.fire('Deleted!', 'Template selected has been deleted!.', 'success');
      }
    });
  }
  
  getAllObj() {
    this.temp.getAllObj().subscribe(
      res => {
        this.objData = res;
        console.log('OBJS', this.objData);
      }
    )
  }

  newField() {
    console.log('FIELD', this.fields.value)
  }
  
}
