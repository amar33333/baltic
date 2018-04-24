import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { CreatePaymentComponent } from './create-payment.component';
import { DialogModule } from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from '../../services/user.service';
import { BeneficiaryComponent } from '../../Components/beneficiary/beneficiary.component';
import { OwnAccountComponent } from '../../Components/own-account/own-account.component';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';
import { DropdownpipeDirective } from './../../dropdown/dropdownpipe.directive'
import { SplitPipe } from './../../dropdownsplit/split.pipe'
import {AmountFormatPipe} from './../..//models/amount-format.pipe';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { Element } from '@angular/compiler';

describe('CreatePaymentComponent', () => {
  let component: CreatePaymentComponent;
  let fixture: ComponentFixture<CreatePaymentComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let htmlElement2: HTMLElement;
  let htmlElement3: HTMLElement;
  let htmlElement4: HTMLElement;
  let input: HTMLInputElement;
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLInputElement;
  let input4: HTMLInputElement;
  let htmlElementb: DebugElement ;
  let dropdown: HTMLSelectElement
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          DialogModule,
          HttpModule,
          BrowserAnimationsModule,
          FormsModule,
          CalendarModule,
          FormsModule,
          DropdownModule
        ],
        providers: [UserService, PaymentData,CommonFunctions],
        declarations: [DropdownpipeDirective,SplitPipe,AmountFormatPipe,
          CreatePaymentComponent,
          BeneficiaryComponent,
          OwnAccountComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should be created', () => {
    expect(component).toBeTruthy();
    
  });
  it(' folder sholuld be visible when save  in folder is CHECKED', () => {
    component.isLoading =false;
    fixture.detectChanges();
    
    input = fixture.debugElement.query(By.css('#save_payfldr')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('#proceed_unauthorise'));
    htmlElement = fixture.debugElement.query(By.css('#folder_dp')).nativeElement;
    htmlElement2 = fixture.debugElement.query(By.css('#closefolder')).nativeElement;

    expect(debugElement).toBeNull();  // state after click
    expect(htmlElement.hidden).toBeFalsy(); // state after click
    expect(htmlElement2.hidden).toBeFalsy(); // state after click
  });
  it('should display option to enter  new folder name on click of Create Folder Button ', () => {
    component.isLoading =false;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#save_payfldr')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();
    htmlElement3 = fixture.debugElement.query(By.css('#crtfolder')).nativeElement;
    expect(htmlElement3.hidden).toBeFalsy(); // state after click
    htmlElement3.click();
    fixture.detectChanges();

    htmlElement4 = fixture.debugElement.query(By.css('#fldr_name')).nativeElement;
    expect(htmlElement4.hidden).toBeFalsy(); // state after click
  });
  it('should unchecked all other checkboxs when- Authorise all payments and close the folder is CHECKED ', () => {
    component.isLoading =false;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#save_payfldr')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();
    input1 = fixture.debugElement.query(By.css('#check_boc4')).nativeElement;
    expect(input1.checked).toBeFalsy();
    input1.click();
    fixture.detectChanges();

    input2 = fixture.debugElement.query(By.css('#check_boc2')).nativeElement;
    input3 = fixture.debugElement.query(By.css('#check_bolc')).nativeElement;
    input4 = fixture.debugElement.query(By.css('#check_boc3')).nativeElement;
    expect(input2.checked).toBeFalsy(); // state after click
    expect(input3.checked).toBeFalsy(); // state after click
    expect(input4.checked).toBeFalsy(); // state after click
  });
  it('should unchecked  Authorise all payments & close the folder and create more payment, when- Close current folder is CHECKED', () => {
    component.isLoading =false;
    fixture.detectChanges();

    input = fixture.debugElement.query(By.css('#save_payfldr')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();
    input1 = fixture.debugElement.query(By.css('#check_boc3')).nativeElement;
    expect(input1.checked).toBeFalsy();
    input1.click();
    fixture.detectChanges();

    input2 = fixture.debugElement.query(By.css('#check_boc4')).nativeElement;
    input3 = fixture.debugElement.query(By.css('#check_bolc')).nativeElement;
    expect(input2.checked).toBeFalsy(); // state after click
    expect(input3.checked).toBeFalsy(); // state after click
  });
  it('should unchecked  Authorise all payments & close the folder and Close current folder, when- create more payment is CHECKED', () => {

    component.isLoading =false;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#save_payfldr')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();
    input1 = fixture.debugElement.query(By.css('#check_bolc')).nativeElement;
    expect(input1.checked).toBeFalsy();
    input1.click();
    fixture.detectChanges();

    input2 = fixture.debugElement.query(By.css('#check_boc3')).nativeElement;
    input3 = fixture.debugElement.query(By.css('#check_boc4')).nativeElement;
    expect(input2.checked).toBeFalsy(); // state after click
    expect(input3.checked).toBeFalsy(); // state after click
  });
  it('should uncheck Proceed to unauthorised payments when create more payment is CHECKED',
    () => {
      component.isLoading =false;
    fixture.detectChanges();
      input = fixture.debugElement.query(By.css('#check_bolc')).nativeElement;
      expect(input.checked).toBeFalsy();
      input.click();
      fixture.detectChanges();

      input2 = fixture.debugElement.query(By.css('#check_boc1')).nativeElement;
      expect(input2.checked).toBeFalsy(); // state after click
    }
  );
  it('should uncheck Proceed to unauthorised payments when Authorise payment is CHECKED',
  () => {
    component.isLoading =false;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#check_boc2')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();

    input2 = fixture.debugElement.query(By.css('#check_boc1')).nativeElement;
    expect(input2.checked).toBeFalsy(); // state after click
  });
  it('should unckeck create more payment and authorise payment when Proceed to unauthorised payments is CHECKED ', () => {
    component.isLoading =false;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('#check_boc1')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();

    input2 = fixture.debugElement.query(By.css('#check_boc2')).nativeElement;
    input3 = fixture.debugElement.query(By.css('#check_bolc')).nativeElement;
    expect(input2.checked).toBeFalsy(); // state after click
    expect(input3.checked).toBeFalsy(); // state after click
  });
  it('on click of clear  button  it should call a function', () => {
    component.isLoading =false;
    component.paymentdata.payment_type='LKT';
    fixture.detectChanges();
    component.paymentdata.formrset();
    expect(component.paymentdata.amount).toEqual('');
    expect(component.paymentdata.beneficiaryAccountNumber).toEqual('');
    expect(component.paymentdata.beneficiaryName).toEqual('');
    expect(component.paymentdata.sender).toEqual(null);
    expect(component.paymentdata.transferType).toEqual('Normal');
    expect(component.paymentdata.payment_type).toEqual('LKT');
  });

  it('on change of the  payment type  component should  change ', () => {
    component.isLoading =false;
    fixture.detectChanges();
    dropdown = fixture.debugElement.query(By.css('#payment_type')).nativeElement;
    console.log(dropdown.options.selectedIndex);
    dropdown.click();
    fixture.detectChanges();
    expect(dropdown.options.selectedIndex).toEqual(-1);
  });

});
