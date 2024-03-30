import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Companies } from 'src/app/interfaces/companies';
import { Obj } from 'src/app/interfaces/objects';
import { CompanyService } from 'src/app/services/company/company.service';
import { TemplatesService } from 'src/app/services/template/templates.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-template-document',
  templateUrl: './template-document.component.html',
  styleUrls: ['./template-document.component.scss'],
})
export class TemplateDocumentComponent implements OnInit {
  userLogged: any = [];

  companyData: any = [];

  objList: any = [];

  oneObj: any = [];

  obj1: any = [];

  obj2: any = [];

  filtrated: any = [];

  folds: any

  appear: any

  totFlds: any

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private temp: TemplatesService,
    private formBuilder: FormBuilder
  ) {}

  searchForm = this.formBuilder.group({
    companies: ['',[Validators.required]],
    templates: ['', [Validators.required]],
    code: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getCompanies();
    this.dataUser();
    this.getAllObj();
}

  dataUser() {
    this.userService.getProfile().subscribe((res) => {
      this.userLogged = res;
      console.log('User', this.userLogged);
    });
  }
  getCompanies() {
    this.companyService.getCompanies().subscribe((res) => {
      this.companyData = res;
      console.log('COMPANIES', this.companyData);
    });
  }
  getAllObj() {
    this.temp.getAllObj().subscribe(
      res => {
        this.objList = res;
        console.log('TEMPLATES', this.objList);
      }
    )
  }

  getOneTemplate(id: string) {
    this.temp.getOneObj(id).subscribe(
      res => {
        this.oneObj = res;
        console.log('ONE OBJ', this.oneObj);
      }
    )
  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;    
    this.obj1 = selectedValue;
    console.log('Selected Company: ', this.obj1);
  }

  onSelectChange_1(event: any) {
    const selectedValue = event.target.value;
    this.obj2 = selectedValue;
    console.log('Selected Template: ', selectedValue);

  }

  filterbyTemplate(): void {
    let fil: Obj[] = this.objList.filter((temp: { name: any; }) => temp.name == this.obj2);
    this.filtrated = fil;

    const fol = this.filtrated[0].fields[0].container;
    const fol_1 = this.filtrated[0].fields[1].container;
    localStorage.removeItem("idc");

    const folderArray = [];
    folderArray[0] = fol;
    folderArray[1] = fol_1;

    const numFolds = folderArray.length;
    this.folds = numFolds;
    
    if(this.folds > 1){
      this.appear = true;
    }else{
      this.appear = false;
    }

    const flds = this.filtrated[0].fields;
    this.totFlds = flds;
  
    
    console.log('FILTRATED', this.totFlds);
    
  }
  

}
