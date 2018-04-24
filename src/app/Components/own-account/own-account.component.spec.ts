import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { OwnAccountComponent } from './own-account.component';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from './../../services/user.service';
import { DropdownpipeDirective } from './../../dropdown/dropdownpipe.directive'
import { SplitPipe } from './../../dropdownsplit/split.pipe'
import { AmountFormatPipe } from './../..//models/amount-format.pipe';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { DateHandelrService } from './../../models/date-handelr.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Paymentmetadata } from './../../models/paymentmetadata';
import { inject } from '@angular/core/testing';
import { } from 'jasmine';

describe('OwnAccountComponent', () => {
  let component: OwnAccountComponent;
  let fixture: ComponentFixture<OwnAccountComponent>;
  let paymentmetadata: Paymentmetadata;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        DropdownModule,
        CalendarModule,
        HttpClientModule
      ],
      providers: [UserService, PaymentData, CommonFunctions, DateHandelrService],
      declarations: [OwnAccountComponent,
        AmountFormatPipe,
        SplitPipe, DropdownpipeDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnAccountComponent);
    component = fixture.componentInstance;
    paymentmetadata = {
      ReturnCode: 0,
      ErrorMessage: "",
      UserMayAuthCurrPaymType: "",
      ShowExchProposal: "",
      FromAccounts:
        [{
          FromAccountsItem: {
            IdKtFrom: "",
            AccountNameFrom: "",
            AccountIdFrom: "",
            CurrencyFrom: "",
          }
        }],
      ExternalFromAccounts:
        [{
          ExternalFromAccountItem: {
            E_IdKtExFrom: "",
            SwiftIdExFrom: "",
            AccountNameExFrom: "",
            AccountIdExFrom: "",
            CurrencyExFrom: "",
          }
        }],
      ToAccounts:
        [{
          ToAccountsItem: {
            IdKtTo: "",
            AccountNameTo: "",
            AccountIdTo: "",
            CurrencyTo: "",
          }
        }],
      Currencies:
        [{
          CurrenciesItem: {
            CurrencyCode: "",
            CurrencyNumDec: 0,
            CurrencyText: "",
          }
        }],
      CurrenciesAlt:
        [{
          CurrenciesAltItem: {
            CurrencyCodeAlt: "",
            CurrencyNumDecAlt: 0,
            CurrencyTextAlt: "",
          }
        }],
      Countries:
        [{
          CountriesItem: {
            CountryCode: "",
            CountryText: "",
          }
        }]
    }
    component.paymentMetaData = paymentmetadata;
    component.paymentdata.sender = "axbask";
    fixture.detectChanges();
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
