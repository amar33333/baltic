import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if ( args === 'acctext') {
return value.split('#')[0];
    }   else if ( args === 'accnumb') {
return value.split('#')[1];
   }
  }

}
