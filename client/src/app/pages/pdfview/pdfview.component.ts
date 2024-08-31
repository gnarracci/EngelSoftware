import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { ObjdynService } from 'src/app/services/objdyn/objdyn.service';

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.scss']
})
export class PdfviewComponent implements OnInit{

  id: string | null;

  form: any;

  dataPDF: any = [];

  constructor(private getId: ActivatedRoute, private objdyn: ObjdynService)  {
    this.id = getId.snapshot.paramMap.get('id');
  }

  

  ngOnInit(): void {
    console.log(this.id);
    this.getOneDyn(this.id!);
  }

  getOneDyn(id:string) {
    this.objdyn.getOnedynPDF(id).subscribe(
      res => {
        this.dataPDF = res;
        console.log('dataPDF',this.dataPDF);
      }
    )
  }

  getDynData(id:string) {
    if(id !== null) {
      this.objdyn.getOnedyn(id).subscribe((data) => {
        this.form = data;
        console.log(this.form);
      })
    }
  }

}
