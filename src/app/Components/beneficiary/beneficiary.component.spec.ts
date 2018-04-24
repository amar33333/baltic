import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { BeneficiaryComponent } from './beneficiary.component';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from './../../services/user.service';
import { By } from '@angular/platform-browser';
import {AmountFormatPipe} from './../..//models/amount-format.pipe';
import { DateHandelrService } from './../../models/date-handelr.service';
import { CommonFunctions } from './../../models/shareddata/common-functions';

describe('BeneficiaryComponent', () => {
  let component: BeneficiaryComponent;
  let fixture: ComponentFixture<BeneficiaryComponent>;
  let htmlElement: HTMLElement;
  let input: HTMLInputElement;
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLTextAreaElement;

  // TestBed.configureTestingModule({
  //   declarations: [BeneficiaryComponent , AmountFormatPipe ]
  // })
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, BrowserAnimationsModule, FormsModule, CalendarModule, DialogModule, FormsModule, DropdownModule],
      providers: [PaymentData, UserService, DateHandelrService, CommonFunctions],
      declarations: [BeneficiaryComponent, AmountFormatPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it(' reference number  and  payment descreption visible  by  default', () => {
    htmlElement = fixture.debugElement.query(By.css('#ref_payDes')).nativeElement;
    expect(htmlElement.hidden).toBeFalsy();


  });
  it(' reference number is enabled  and payment descreipton id disabled by default at the  beginning', () => {
    input = fixture.debugElement.query(By.css('#r1')).nativeElement;
    input1 = fixture.debugElement.query(By.css('#r2')).nativeElement;
    expect(input.checked).toBeTruthy();
    expect(input1.checked).toBeFalsy();
  });

  it(' reference  textbox is enable and paymentdescreption textarea is disabled', () => {
    input2 = fixture.debugElement.query(By.css('#rb1')).nativeElement;
    input3 = fixture.debugElement.query(By.css('#rb2')).nativeElement;
    expect(input2.disabled).toBeFalsy();
    expect(input3.attributes.getNamedItem('ng-reflect-is-disabled').value).toBeTruthy();
  });

  it(' on click of one radio button other should be  disabled', () => {
    input = fixture.debugElement.query(By.css('#rb1')).nativeElement;
    input1 = fixture.debugElement.query(By.css('#rb2')).nativeElement;
    expect(input.checked).toBeFalsy();
    expect(input1.checked).toBeFalsy();
  });

});


