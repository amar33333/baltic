import { AccountService } from './services/account.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BeneficiaryComponent } from './Components/beneficiary/beneficiary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { CreateCreditorComponent } from './Components/create-creditor/create-creditor.component';
import { CreatePaymentComponent } from './Components/create-payment/create-payment.component';
import { DialogModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { OwnAccountComponent } from './Components/own-account/own-account.component';
import { PaymentData } from './models/shareddata/payment-data';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { ViewCreditorComponent } from './Components/view-creditor/view-creditor.component';
import { ViewPaymentComponent } from './Components/view-payment/view-payment.component';
import { DropdownpipeDirective } from './dropdown/dropdownpipe.directive';
import { SplitPipe } from './dropdownsplit/split.pipe';
import { CommonFunctions } from './models/shareddata/common-functions';
import { AmountFormatPipe } from './models/amount-format.pipe';
import { DateFormatPipe } from './models/date-format.pipe';
import { DateHandelrService } from './models/date-handelr.service';
@NgModule({
  declarations: [
    AppComponent,
    BeneficiaryComponent,
    OwnAccountComponent,
    CreateCreditorComponent,
    CreatePaymentComponent,
    ViewCreditorComponent,
    ViewPaymentComponent,
    DropdownpipeDirective,
    SplitPipe,
    AmountFormatPipe,
    DateFormatPipe,


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
  ],
  providers: [
    AccountService,
    PaymentData,
    UserService,
    CommonFunctions,
    DateHandelrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
