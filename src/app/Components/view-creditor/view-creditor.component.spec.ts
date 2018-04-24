import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './../../services/user.service';
import { HttpModule } from '@angular/http';
import {} from 'jasmine';
import { ViewCreditorComponent } from './view-creditor.component';
import { By } from '@angular/platform-browser';


describe('ViewCreditorComponent', () => {
  let component: ViewCreditorComponent;
  let fixture: ComponentFixture<ViewCreditorComponent>;
  let htmlElement1: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      providers: [UserService],
      declarations: [ViewCreditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should display creditor details ', () => {
    htmlElement1= fixture.debugElement.query(By.css('#cdrId')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  });
  it('should display paymentdata ', () => {
    htmlElement1= fixture.debugElement.query(By.css('#paydata')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  });
  it('should display status details on click of status detail  header  ', () => {
    component.status_details=true;
    fixture.detectChanges();
    htmlElement1= fixture.debugElement.query(By.css('#statsdtail')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  });
  it('should display creditor   header  ', () => {
    component.delete=false;
    component.cdr_status='ACTIVE';
    component.creditor={ReturnCode: 0,
      ErrorMessage: '',
      CreditorId: '',
      CreditorStatus: '',
      CreditorStatusText: '',
      CreditorNameId: '',
      CreditorName: '',
      SendersAccountId: '',
      SendersAccountNo: '',
      BenAccountNo: '',
      TemplateId: '',
      TemplateStatus: '',
      PaymentTypeText: '',
      CreditorCreatedBy: '',
      CreditorCreatedTime: '',
      CreditorCreatedName: '',
      CreditorFirstAuthorisedBy: '',
      CreditorFirstAuthorisedTime: '',
      CreditorFirstAuthorisedName: '',
      CreditorSecondAuthorisedBy: '',
      CreditorSecondAuthorisedTime: '',
      CreditorSecondAuthorisedName: '',
      LatestActionTime: '',
      CreateCreditorAllowed: '',
      AuthoriseCreditorAllowed: '',
      ReferenceNumber: '',
      PaymentDescription: '',
      DocumentNumber: '',
      PaymentCurrency: '',
      BenName: '',
      PaymentEndToEndId: '',
      BenAddress: '',
      BenCountry: '',
      Urgent: '',
      StatisticCode: ''}
    fixture.detectChanges();
    htmlElement1= fixture.debugElement.query(By.css('#crd')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  });

  it('should display draft option  fields', ()=>{
    component.cdr_status='DRAFT';
    component.auth=false;
    component.del_draft=false;
    fixture.detectChanges();
    htmlElement1= fixture.debugElement.query(By.css('#drft')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  })
  it('should display authorise button for draft ', ()=>{
    component.cdr_status='DRAFT';
    component.authorise='Y';
    component.auth=false;
    component.del_draft=false;
    fixture.detectChanges();
    htmlElement1= fixture.debugElement.query(By.css('#authbtn')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  })
  it('should display ok and cancel button on delete creditor', ()=>{
    component.delete=true;
    component.auth=true;
    component.del_draft=false;
    fixture.detectChanges();
    htmlElement1= fixture.debugElement.query(By.css('#delt')).nativeElement;
    expect(htmlElement1.hidden).toBeFalsy();
  })
});
