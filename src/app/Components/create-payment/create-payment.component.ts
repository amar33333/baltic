import { ActivatedRoute, Params, Router } from '@angular/router';
import { BeneficiaryComponent } from '../../Components/beneficiary/beneficiary.component';
import { Paymentmetadata } from './../../models/paymentmetadata';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { DropdownModule } from 'primeng/primeng';
import { inject } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { OwnAccountComponent } from '../../Components/own-account/own-account.component';
import { PaymentData } from './../../models/shareddata/payment-data';
import { Settings } from './../../models/Settings';
import { SelectItem } from 'primeng/primeng';
import { UserService } from './../../services/user.service';
import { AccountAuthorisation } from './../../models/accountauthorisation';
import { BalanceModel } from './../../models/balance-model';
import { AccountBalanceModel } from './../../models/AccountBalanceModel';
import { Creditordata } from './../../models/creditordata'
@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {

  public visible = false;
  public value_text: string;
  public account_type: string;
  public myAccount: boolean;
  public sender: SelectItem[];
  public senderAccount: SelectItem[];
  public beneficiaryAccount: SelectItem[];
  public creditor_ID: any;
  // public sender_account: any;
  public senderAcc: any;
  public more_payments = false;
  public authorize_payment = false;
  public proceed_unauthorized_payment = false;
  public close_folder = false;
  public close_folder_authorize_payment = false;
  public viewresult;
  public copy: boolean;
  public edit: boolean;
  public userSettings: Settings;
  isLoading = true;
  public balanceLoading:boolean;
  public paytypeLoading:boolean;
  folderPayment = false;
  public paymentTypesList: string[];
  public foldersList: string[];
  CallerFunction: string;
  public paymentmetadata: Paymentmetadata;
  public accountAuthorisation: AccountAuthorisation;
  public balancemodel: BalanceModel;
  public fldr_loading:Boolean
  public creditordata: Creditordata;

  // Business Online settings
  public numberFormatBo = window['boDecimalSeparator'];
  public boDateFormat = window['boDateFormat'];
  public boCountryCode = window['boCountryCode'];
  public boViewUser = window['boViewUser'];


  constructor(
    private _service: UserService,
    public paymentdata: PaymentData,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public commonfunctions: CommonFunctions,
  ) {
    this.myAccount = false;
    this.copy = false;
    this.edit = false;
    this.paymentdata.paytype = false;
    this.viewresult = [];
    this.senderAccount = [];
    this.CallerFunction = 'createPayment';

    // this.senderAccount.push({ label: 'select account', value: '' });
  }

  onSubmit(myform: NgForm) {
    // this.sometext = this.beneficiary.sender_test;
    console.log('Form Submitted!');
    console.log(myform);
  }
  getCreditor(id) {
    console.log(id);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  ngDoCheck() {

    // this.validateData();
  }
  private validateData() {
    this.paymentdata.isBenAccNum_AccTrnfInValid = this.paymentdata.BenAccNum_AccTrnf === undefined || this.paymentdata.BenAccNum_AccTrnf === '';
    this.paymentdata.isBenName_AccTrnfInValid = this.paymentdata.BenName_AccTrnf === undefined || this.paymentdata.BenName_AccTrnf === '';
    this.paymentdata.isAmount_AccTrnfInValid = this.paymentdata.Amount_AccTrnf === '' || this.paymentdata.Amount_AccTrnf === undefined;
    this.paymentdata.isTransfer_typeAccTrnfInValid = this.paymentdata.Transfer_typeAccTrnf === '' || this.paymentdata.Transfer_typeAccTrnf === undefined;
    this.paymentdata.isReferenceNum_AccTrnfInValid = (this.paymentdata.ReferenceNum_AccTrnf === '' || this.paymentdata.ReferenceNum_AccTrnf == undefined) &&
      (this.paymentdata.MsgToBen_AccTrnf === '' || this.paymentdata.MsgToBen_AccTrnf === undefined);
    this.paymentdata.isMsgToBen_AccTrnfInValid = (this.paymentdata.ReferenceNum_AccTrnf === '' || this.paymentdata.ReferenceNum_AccTrnf == undefined) &&
      (this.paymentdata.MsgToBen_AccTrnf === '' || this.paymentdata.MsgToBen_AccTrnf === undefined);

    this.paymentdata.isSenderAccInValid = this.paymentdata.sender === '';
    // this.paymentdata.isBeneficiaryAccInValid = this.paymentdata.beneficiaryAccountNumber === ''
    // this.paymentdata.isBeneficiaryNameValid = this.paymentdata.beneficiaryName === '' || this.paymentdata.beneficiaryName === undefined;
    // this.paymentdata.isAmountInValid = this.paymentdata.amount === ''
    // this.paymentdata.isfolderInValid = this.paymentdata.folderName === '' || this.paymentdata.folderName === undefined
    // this.paymentdata.isDocumnetNumInValid = this.paymentdata.documentNumberDate === '' || this.paymentdata.documentNumberDate === undefined
    // this.paymentdata.isMessageToBenInValid = this.paymentdata.referencenumber === '' && this.paymentdata.messageToBen === ''
    // this.paymentdata.isReferenceNumberInValid = this.paymentdata.referencenumber === '' && this.paymentdata.messageToBen === ''
  }

  setval1(val) {
    if (val === true) {
      this.proceed_unauthorized_payment = false;
      this.close_folder_authorize_payment = false;
      this.close_folder = false;
    }
  }
  setval4(val) {
    if (val === true) {
      this.close_folder_authorize_payment = false;
      this.proceed_unauthorized_payment = false;
    }
  }
  setval3(val) {
    if (val === true) {
      this.close_folder_authorize_payment = false;
      this.more_payments = false;
    }
  }
  setval(val) {
    if (val === true) {
      this.authorize_payment = false;
      this.more_payments = false;
      this.close_folder = false;
    }
  }

  savedata() {
    this.validateData();
    this.paymentdata.date;
    if (
      this.paymentdata.isfolderInValid &&
      this.paymentdata.isSenderAccInValid &&
      this.paymentdata.isBeneficiaryAccInValid &&
      this.paymentdata.isAmountInValid &&

      this.paymentdata.isBeneficiaryNameValid &&
      (this.paymentdata.isReferenceNumberInValid ||
        this.paymentdata.isMessageToBenInValid)
    ) {
      if (this.myAccount === false) {
        console.log(this.paymentdata.messageToBen);
        console.log(this.paymentdata.isDocumnetNumInValid);
        console.log(this.paymentdata.paymentIdNumber);
      } else {
        // console.log(this.sender_account);
        console.log(this.paymentdata.beneficiaryAccountNumber);

        console.log(this.paymentdata.isDocumnetNumInValid);
      }
    } else {
    }
  }

  private onFolderChecked() {
    if (this.folderPayment) {
      this.fldr_loading = true;
      this._service.foldersList().
        subscribe((result) => {
          this.foldersList = result.Folders;
          this.fldr_loading = false;
          console.log(this.foldersList);
        })
    }
  }

  changePage(page) {
    console.log(page);
    if (page === 'UBB') {
      window.location.href =
        'https://app.pluralsight.com/library/search?q=angular';
    }
    else {
      this.getPaymentMetaData(page, '');
    }
  }

  ngOnInit() {

    this._service.paymentTypes(this.CallerFunction).
      subscribe((result) => {
        this.isLoading = true;
        this.paymentTypesList = result.PaymentTypes;
        if (this.boCountryCode === 'LV') {
          this.paymentdata.payment_type = 'VKT';
          this.isLoading = false;
        } else if (this.boCountryCode === "LT") {
          this.paymentdata.payment_type = 'LKT';
          this.isLoading = false;
        } else if (this.boCountryCode === 'EE') {
          this.paymentdata.payment_type = 'TKT';
          this.isLoading = false;
        }
        console.log(this.paymentTypesList);
        console.log(this.boCountryCode);

      })

    this._service.userSettings().
      subscribe((result) => {
        // this.isLoading = false;
        this.userSettings = result;
        console.log(this.userSettings);
        // this.userSettings.DefaultSavePaymentInFolder = "Y";
        //   this.userSettings.IsRestricted = "Y";

        if (this.userSettings.DefaultSavePaymentInFolder === 'Y') {
          this.folderPayment = true;
          this.onFolderChecked();
        }
      })

    if (this.boCountryCode === 'LV') {
      this.getPaymentMetaData('VKT', '');
    } else if (this.boCountryCode === 'LT') {
      this.getPaymentMetaData('LKT', '')
    } else if (this.boCountryCode === 'EE') {
      this.getPaymentMetaData('TKT', '')
    }
    let va: any;
    let ca: any;
    let CreditorId: string;
    let CreditorStatus: string;
    let TemplateId: string;
    let TemplateStatus: string;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      va = params['Pay_Id'];
      ca = params['ID'];

      if (ca === 'copy') {
        this.copy = true;
        this.paymentdata.paytype = true;
      }
      if (ca === 'edit') {
        this.edit = true;
        this.paymentdata.paytype = false;
      }
      if (ca === 'creditor_createPayment') {
        this.edit = true;
        this.paymentdata.paytype = false;
        CreditorId = params['cdrid'];
        CreditorStatus = params['cdrstatus'];
        TemplateId = params['tmpid'];
        TemplateStatus = params['tmpstatus'];
      }
    });
  }

  getPaymentMetaData(paymenttype: string, ViewUser: string) {
    this.isLoading = true;
    this.senderAccount =[];
    this._service.getpaymentmetadata(paymenttype, ViewUser).subscribe(result => {
      this.paymentmetadata = result;
      this.isLoading = false;
      console.log(this.paymentmetadata);

      for (let i = 0; i < result.FromAccounts.length; i++) {
                this.senderAccount.push({
          label:
            this.paymentmetadata.FromAccounts[i].FromAccountsItem
              .AccountNameFrom +
            '#' +
            this.paymentmetadata.FromAccounts[i].FromAccountsItem
              .AccountIdFrom +
            '  ' +
            this.paymentmetadata.FromAccounts[i].FromAccountsItem.CurrencyFrom,
          value: this.paymentmetadata.FromAccounts[i].FromAccountsItem.IdKtFrom
        });
      }           
      if (this.userSettings.DefaultFromAccountId !== '') {
        this.paymentdata.sender = this.userSettings.DefaultFromAccountId;
      }
      else {
        this.paymentdata.sender = this.paymentmetadata.FromAccounts[0].FromAccountsItem.IdKtFrom;
      }      
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  createfolder() {
    this.visible = !this.visible;
    // this.paymentdata.folderName = '' ;

  }

  showBalance(IDKT: any) {
    this.commonfunctions.isBalance = true;
    console.log("*************************** Account balance ***************************");
    this.balanceLoading = true;
    this._service.accountAuthorisation(IDKT).
      subscribe((result) => {
        this.accountAuthorisation = result;
        console.log(this.accountAuthorisation);
        console.log(this.accountAuthorisation.HasAuthorization);
        console.log(this.balancemodel)
        if (this.accountAuthorisation.HasAuthorization === 'Y') {
          this._service.getAccountBalance(IDKT).
            subscribe((result) => {
              this.balancemodel = result;
              this.balanceLoading = false;
              console.log(this.balancemodel)
            })
        }
      })

  }
}
