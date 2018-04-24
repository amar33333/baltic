import { Viewpayments } from '../../models/viewpayments';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {

  public viewresult: Viewpayments;
  public tech_ref = false;
  public bank_ref;
  public status_flag = false;

  constructor(private commandata: PaymentData, private viewdata: UserService, private activatedRoute: ActivatedRoute) {

  }
  // Business online
  public numberFormatBo = window['boDecimalSeparator'];
  public boDateFormat = window['boDateFormat'];
  public bocountryCode = window['bocountryCode']
  public boViewUser = window['boViewUser'];

  goCNN() {
    window.location.href = 'https://syst-business2.danskebank.com/BN/GenericNS/GenericNS.aspx?q=881104230';
  }
  techref() {
    this.tech_ref = !this.tech_ref;
  }
  status() {
    this.status_flag = !this.status_flag;
  }

  ngOnInit() {
    let va: any;
    let paymentRefNum:any;
    let paymentCatg:any;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      va = params['id'];
      paymentRefNum=params['payref'];
      paymentCatg=params['paycatg'];


    });
    this.viewdata.getViewData(paymentRefNum,paymentCatg)
      .subscribe(result => {
        (this.viewresult = result[0]);
        console.log(this.viewresult)
        console.log(result);
      })
  }
}
