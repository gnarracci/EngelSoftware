import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
    //if(arg === '' || arg.length < 3) return value;
    const resultObjs = [];
    for(const item of value) {
      if (item.code.indexOf(arg) > -1) {
        resultObjs.push(item);
      };
    };
    return resultObjs;
  }

}
