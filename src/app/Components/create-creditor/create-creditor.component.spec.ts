import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Settings } from './../../models/Settings';
import { CreateCreditorComponent } from './create-creditor.component';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectItem } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/primeng';
import { UserService } from './../../services/user.service';
import { DropdownpipeDirective } from './../../dropdown/dropdownpipe.directive'
import { SplitPipe } from './../../dropdownsplit/split.pipe'
import { PaymentData } from './../../models/shareddata/payment-data';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { Element } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Http } from '@angular/http/src/http';


describe('CreateCreditorComponent:test', () => {
  let fixture: ComponentFixture<CreateCreditorComponent>;
  let htmlElement4: HTMLElement;
  let htmlElement1: HTMLElement;
  let htmlElement:HTMLInputElement;
  let dropdown: HTMLSelectElement;
  let userSettings: Settings;

  let component: CreateCreditorComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, HttpModule, FormsModule, DropdownModule],
      providers: [UserService, PaymentData, CommonFunctions],

      declarations: [CreateCreditorComponent, SplitPipe, DropdownpipeDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should hide lable payment Id  for Transfer Type Urgent ', () => {
    component.userSettings = {
      MayCreateCreditors: '',
      DefaultFromAccountId: '',
      MayCreateFolderWithConfPaym: '',
      ReturnCode: 0,
      IsRestricted: '',
      DefaultSavePaymentInFolder: '',
      ErrorMessage: '',
    }
    component.creditor_Acc_type.IsUrgent = 'N';
    component.userSettings.MayCreateCreditors = 'Y';
    fixture.detectChanges();
    htmlElement4 = fixture.debugElement.query(By.css('#payment_number')).nativeElement;
    expect(htmlElement4.hidden).toBeFalsy();


  });
  it('should make ref num and message to ben  mandatory ', () => {
    component.userSettings = {
      MayCreateCreditors: '',
      DefaultFromAccountId: '',
      MayCreateFolderWithConfPaym: '',
      ReturnCode: 0,
      IsRestricted: '',
      DefaultSavePaymentInFolder: '',
      ErrorMessage: '',
    }
    component.creditor_Acc_type.IsUrgent = 'N';
    component.userSettings.MayCreateCreditors = 'Y';
    component.commonfunctions.estoniaflag=true;
    fixture.detectChanges();
    htmlElement4 = fixture.debugElement.query(By.css('#estnia')).nativeElement;
    expect(htmlElement4.hidden).toBeFalsy();


  });
  it('should toggel mandatory field  ref num and msg to ben', () => {
    component.userSettings = {
      MayCreateCreditors: '',
      DefaultFromAccountId: '',
      MayCreateFolderWithConfPaym: '',
      ReturnCode: 0,
      IsRestricted: '',
      DefaultSavePaymentInFolder: '',
      ErrorMessage: '',
    }
    component.creditor_Acc_type.IsUrgent = 'N';
    component.userSettings.MayCreateCreditors = 'Y';
    component.commonfunctions.estoniaflag=false;
    fixture.detectChanges();
    expect(htmlElement4.hidden).toBeFalsy();
    htmlElement = fixture.debugElement.query(By.css('#r2')).nativeElement;
    htmlElement.click();
    fixture.detectChanges();
    htmlElement1 = fixture.debugElement.query(By.css('#ref_payDes')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();



  });
});
