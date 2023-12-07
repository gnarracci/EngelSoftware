import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  year:number = this.getYear();

  constructor() {}

  ngOnInit() {
    this.getYear();
  }

  getYear() {
    let d = new Date();
    let y = d.getFullYear();
    return y;
  }

}
