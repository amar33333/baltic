import { AppComponent } from './app.component';
import { BeneficiaryComponent } from './Components/beneficiary/beneficiary.component';
import { CreateCreditorComponent } from './Components/create-creditor/create-creditor.component';
import { CreatePaymentComponent } from './Components/create-payment/create-payment.component';
import { NgModule } from '@angular/core';
import { OwnAccountComponent } from './Components/own-account/own-account.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewCreditorComponent } from './Components/view-creditor/view-creditor.component';
import { ViewPaymentComponent } from './Components/view-payment/view-payment.component';




const appRoutes: Routes = [
  {path:'default.aspx',component: CreatePaymentComponent},
  { path: '', component: CreatePaymentComponent },
  { path: 'view',  component: ViewPaymentComponent },
  { path: 'copy',  component:  CreatePaymentComponent },
  { path: 'edit',  component:  CreatePaymentComponent },
  { path: 'createcreditor',  component:  CreateCreditorComponent },
  { path: 'viewcreditor',  component:  ViewCreditorComponent },
  { path: 'deletecreditor',  component:  ViewCreditorComponent },
  { path: 'authorisecreditor',  component:  ViewCreditorComponent },
  { path: 'copycreditor',  component:  CreateCreditorComponent },
  { path: 'editcreditor',  component:  CreateCreditorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


