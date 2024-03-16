import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  userLogged: any = {};

  companyData: any = [];

  constructor(
    private userService: UserService,
    private companyServie: CompanyService,
    private formBuilder: FormBuilder
  ) {}

  template1: FormGroup = this.formBuilder.group({
    companies: ['', [Validators.required]],
    dma: ['', [Validators.required]],
    fields: this.formBuilder.array([
      ['', [Validators.required]]
    ]),
  });

  ngOnInit(): void {
    this.dataUser();
    this.getCompanies();
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
    });
  }

  get fields() {
    return this.template1.get('fields') as FormArray;
  }

  addItem() {
    this.fields.push(this.formBuilder.control(''));
  }

  saveTemplate() {
    console.log(this.template1.value);
    this.template1.reset();
    // this.template1.controls['fields'] = this.formBuilder.array([]);
  }

  
}
