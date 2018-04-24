import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    try {
      let year = value.substr(0, 4);
      let month = value.substr(5, 2);
      let day = value.substr(8, 2);

      switch (args) {
        case 'yyyy.MM.dd':
          return year + '.' + month + '.' + day;

        case 'dd.MM.yyyy':
          return day + '.' + month + '.' + year;

        case 'MM/dd/yyyy':
          return month + '/' + day + '/' + year;

        case 'yyyy-MM-dd':
          return year + '-' + month + '-' + day;

        case 'dd-MM-yyyy':
          return day + '-' + month + '-' + year;                                
      
        default:
          return year + '.' + month + '.' + day;
      }      
    } catch (error) {
      return '';
    }

    
  }

}
