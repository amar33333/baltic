import { Injectable } from '@angular/core';

@Injectable()
export class DateHandelrService {

  constructor() { }
  public convertBoDateFormat2NgPrime(boDateFormat: string): string{
    boDateFormat = boDateFormat.replace('yyyy', 'yy');
    boDateFormat = boDateFormat.replace('MM', 'mm');
    return boDateFormat;
  }

}
