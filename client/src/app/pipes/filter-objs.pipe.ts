import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterObjs'
})
export class FilterObjsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
