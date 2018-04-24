import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountFormat'
})
export class AmountFormatPipe implements PipeTransform {
  temp_value: string[]; 
  transform(value: any, args?: any): any {
    try{
      this.temp_value = value.split('.'); 
      
      switch(args){
        case ',' :
          this.temp_value[0] = this.temp_value[0].replace(/,/g ,'.');
          return this.temp_value[0]+','+this.temp_value[1];
                     
        case '.'  :  
          this.temp_value[0] = this.temp_value[0].replace(/\./g ,',');
          return this.temp_value[0]+'.'+this.temp_value[1];

        default :   
          this.temp_value[0] = this.temp_value[0].replace(/,/g ,'.');
          return this.temp_value[0]+','+this.temp_value[1];
        }
    } catch(error){
      return '';
    }
  }

}
