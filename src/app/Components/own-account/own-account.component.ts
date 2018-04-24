import { SelectItem } from 'primeng/primeng';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from './../../services/user.service';
import { Paymentmetadata } from './../../models/paymentmetadata';
import { Settings } from './../../models/Settings';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { Component, OnInit, Input } from '@angular/core';
import { TooltipModule } from 'primeng/primeng';
import { DateHandelrService } from './../../models/date-handelr.service';

@Component({
  selector: 'app-own-account',
  templateUrl: './own-account.component.html',
  styleUrls: ['./own-account.component.css']
})
export class OwnAccountComponent implements OnInit {
  @Input() userSettings: Settings;
  @Input() senderAccounts: string[];
  @Input() paymentMetaData: Paymentmetadata;
  public _currency: string;
  public placeholderAmut = 'NN,NNN.NN';
  isLoading = true;
  public minDateValue: Date;
  constructor(public paymentdata: PaymentData, private userservice: UserService,
    public commonfunctions: CommonFunctions, public date_hadler: DateHandelrService) {
    this.minDateValue = new Date();
    //  this.beneficiaryAccount = [];
    // this.beneficiaryAccount.push({ label: 'select account', value: '' });
  }
  // Business online
  public numberFormatBo = window['boDecimalSeparator'];
  public boDateFormat = window['boDateFormat'];
  public bocountryCode = window['bocountryCode']
  public boViewUser = window['boViewUser'];


  ngOnInit() {
    // this.bocountryCode = 'LV';
    // this.boDateFormat = 'yyyy/MM/dd';
    // this.numberFormatBo = '.';
     console.log(this.senderAccounts);

    //  getting  data for beneficiary dropdown on load
this.commonfunctions.changeflag(this.paymentdata.sender,this.paymentdata.payment_type,this.paymentMetaData)
    this.SameAccount();

    // getting data for  currencis dropdown on load
    this.commonfunctions.changeflag(this.paymentdata.sender, this.paymentdata.payment_type, this.paymentMetaData);
  }
  CheckValidation() {
    this.paymentdata.isReferenceNumberInValid = true;
  }
  ValidateDate(event) {
    var x = event.target.value;
    console.log(x);
    console.log(this.paymentdata.date);
    // if(this.paymentdata.date===null||this.paymentdata.date===undefined){
    //   console.log("entered date = "+x+"which is  invalid format")
    // }
    // else{

    //   console.log("entered date = "+this.paymentdata.date+"which is  valid format")
    // }

  }
  onBlurMethod(event) {

  }
  chageText(input: any) {
    input.value = '';
  }
  // transfer  between same  acount across  differnt curriencies
  SameAccount() {
    this.paymentdata.beneficiaryAccount = [];
    this.paymentdata.beneficiaryAccountNumber = '';
    var AccountId;
    // this.paymentdata.beneficiaryAccount.push({label: 'select account', value: ''});
    console.log(this.paymentdata.sender);

    if (this.paymentdata.sameaccount) {
      for (let i = 0; i < this.paymentMetaData.ToAccounts.length; i++) {
        if (this.paymentMetaData.ToAccounts[i].ToAccountsItem.IdKtTo ===this.paymentdata.sender)
         {
           AccountId = this.paymentMetaData.ToAccounts[i].ToAccountsItem.AccountIdTo;
         }}
         console.log(AccountId);
         for (let i = 0; i < this.paymentMetaData.ToAccounts.length; i++) {
          if (this.paymentMetaData.ToAccounts[i].ToAccountsItem.AccountIdTo === AccountId)
          {
          this.paymentdata.beneficiaryAccount.push({
            label:
            this.paymentMetaData.ToAccounts[i].ToAccountsItem
              .AccountNameTo +
            '#' +
            this.paymentMetaData.ToAccounts[i].ToAccountsItem.AccountIdTo +
            '  ' +
            this.paymentMetaData.ToAccounts[i].ToAccountsItem.CurrencyTo,
            value: this.paymentMetaData.ToAccounts[i].ToAccountsItem
              .IdKtTo
          });
        }
      }
    } else {
      for (let i = 0; i < this.paymentMetaData.ToAccounts.length; i++) {
        if (
          !this.paymentdata.beneficiaryAccount.find(
            x =>
              x.label.split('#')[1] ===
              this.paymentMetaData.ToAccounts[i].ToAccountsItem.AccountIdTo
          )
        ) {
          this.paymentdata.beneficiaryAccount.push({
            label:
            this.paymentMetaData.ToAccounts[i].ToAccountsItem
              .AccountNameTo +
            '#' +
            this.paymentMetaData.ToAccounts[i].ToAccountsItem.AccountIdTo,
            value: this.paymentMetaData.ToAccounts[i].ToAccountsItem
              .AccountIdTo
          });
        }
      }
    }
    this.isLoading = false;
    this.paymentdata.beneficiaryAccountNumber = this.paymentMetaData.ToAccounts[0].ToAccountsItem.IdKtTo;
  }
}
