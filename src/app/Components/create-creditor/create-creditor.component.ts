import { ActivatedRoute, Params, Router, RouterStateSnapshot  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Creditordata } from './../../models/creditordata';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { UserService } from './../../services/user.service';
import { Paymentmetadata } from './../../models/paymentmetadata';
import { Settings } from './../../models/Settings';
import { PaymentData } from './../../models/shareddata/payment-data';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { PostCreditorRequestModel } from './../../creditor-object';
import { CreateInputFromScreen } from './../../creditor-object';
import { CreateCreditorAccTrftype } from './../../creditor-object';
import {CreateCrediotrOutput} from  './../../models/createcreditoroutput'
@Component({
  selector: 'app-create-creditor',
  templateUrl: './create-creditor.component.html',
  styleUrls: ['./create-creditor.component.css']
})
export class CreateCreditorComponent implements OnInit {
  public creditor_model: PostCreditorRequestModel;
  public input_fromScreen: CreateInputFromScreen;
  public creditor_Acc_type: CreateCreditorAccTrftype;
  public currentURL: string;
  public senderAccount: SelectItem[];
  public copy: boolean
  public edit: boolean
  public copyDraft: boolean
  public editDraft: boolean
  public paytype: boolean
  public paymentTypesList: string[];
  public CallerFunction: string;
  public isLoading = true;
  public isCurrencyLoaded = false;
  public Error_Message: any;
  public creditordata: Creditordata;
  public paymentmetadata: Paymentmetadata;
  public userSettings: Settings;
  public documentNumberDate: string;
  public CreditorResult: CreateCrediotrOutput;
  public isCreditorNameInValid: boolean;
  public isCreditorNameIdInValid: boolean;
  public paymentType:string;
  // Business Online settings
  public numberFormatBo = window['boDecimalSeparator'];
  public boDateFormat = window['boDateFormat'];
  public boCountryCode = window['boCountryCode'];
  public boViewUser = window['boViewUser'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private paymentdata: PaymentData,
    public commonfunctions: CommonFunctions,
    private router: Router) {
    this.documentNumberDate = this.dateformate();
    this.copy = false;
    this.edit = false;
    this.copyDraft = false;
    this.editDraft = false;
    this.paytype = false;
    this.CallerFunction = 'createCreditor';
    this.currentURL = window.location.href;
    // this.userSettings={
    //   MayCreateCreditors:'',
    //   DefaultFromAccountId:'',
    //   MayCreateFolderWithConfPaym:'',
    //   ReturnCode:0,
    //   IsRestricted:'',
    //   DefaultSavePaymentInFolder:'',
    //   ErrorMessage:'',
    // }

  }
  dateformate() {
    const dtVar = new Date();
    const docnum =
      ('0' + (dtVar.getMonth() + 1)).slice(-2) +
      ('0' + dtVar.getDate()).slice(-2) +
      ('0' + dtVar.getHours()).slice(-2) +
      ('0' + dtVar.getMinutes()).slice(-2) +
      ('0' + dtVar.getSeconds()).slice(-2);
    return docnum;
  }
  validateCreditor() {
    this.isCreditorNameIdInValid = this.input_fromScreen.CreditorNameId === '' || this.input_fromScreen.CreditorNameId === undefined;
    this.isCreditorNameInValid = this.input_fromScreen.CreditorName === '' || this.input_fromScreen.CreditorName === undefined;

  }
  onSubmit(form: NgForm) {
    this.validateCreditor();
    if (!this.isCreditorNameIdInValid && !this.isCreditorNameInValid) {
      this.input_fromScreen.DocumentNumber = this.documentNumberDate;
      this.creditor_model.InputFromScreen = this.input_fromScreen;
      this.creditor_model.CreditorAccTrftype = this.creditor_Acc_type;


      console.log(this.creditor_model);

      if (!this.edit && !this.editDraft) {
        this._userService.addCreditor(this.creditor_model)
          .subscribe((result) => {
            console.log(result.ErrorMessage);
            this.CreditorResult = result;
            console.log(this.CreditorResult);
            switch (result.ReturnCode) {
              case 0:
                {
                  const navUrl = this.currentURL.split('BN2');
                  window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';
                  break;
                }
              default: {
                this.Error_Message = result.ErrorMessage;
              }
            }

          })
      } else {

        this._userService.editCreditor(this.creditor_model)
          .subscribe((result) => {
            console.log(result.ErrorMessage);
            this.CreditorResult = result;
            console.log(this.CreditorResult);
            switch (result.ReturnCode) {
              case 0:
                {
                  const navUrl = this.currentURL.split('BN2');
                  window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';

                  break;
                }
              default: {
                this.Error_Message = result.ErrorMessage;
              }
            }

          })

      }
    }
  }
  ListofCreditor(){
    const navUrl = this.currentURL.split('BN2');
    window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';
  }
  validateCreditorNameId(data: string) {
    this.isCreditorNameIdInValid = this.input_fromScreen.CreditorNameId === '' || this.input_fromScreen.CreditorNameId === null || this.input_fromScreen.CreditorNameId === undefined ;
  }

  validateCreditorName(data: string) {
    this.isCreditorNameInValid = this.input_fromScreen.CreditorName === '' || this.input_fromScreen.CreditorName === null || this.input_fromScreen.CreditorName === undefined ;
  }
  ngOnInit() {
    let va: any;
    let Action: any;
    let CreditorId: string;
    let CreditorStatus: string;
    let TemplateId: string;
    let TemplateStatus: string;
    let Pay_catg: '';
    this.creditor_model = new PostCreditorRequestModel();
    this.input_fromScreen = new CreateInputFromScreen();
    this.creditor_Acc_type = new CreateCreditorAccTrftype();
    this.CreditorResult = new CreateCrediotrOutput();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      Action = params['Action'];
      CreditorId = params['cdrid'];
      CreditorStatus = params['cdrstatus'];
      TemplateId = params['tempid'];
      TemplateStatus = params['tempstatus'];
      Pay_catg = params['paycatg'] || '';

      if (Action === 'copyCreditor') {
        this.copy = true;
        this.paytype = false;
        this.GetCreditor(Pay_catg, CreditorId, CreditorStatus, TemplateId, TemplateStatus);
      }
      if (Action === 'editCreditor') {
        this.edit = true;
        this.paytype = true;
        this.GetCreditor(Pay_catg, CreditorId, CreditorStatus, TemplateId, TemplateStatus);

      }
      if (Action === 'copyDraft') {
        this.copyDraft = true;
        this.paytype = false;
        this.GetCreditor(Pay_catg, CreditorId, CreditorStatus, TemplateId, TemplateStatus);

      }
      if (Action === 'editDraft') {
        this.editDraft = true;
        this.paytype = true;
        this.GetCreditor(Pay_catg, CreditorId, CreditorStatus, TemplateId, TemplateStatus);


      }
    });
    this.getPaymentTypes();
    this.getUserSettings();
    if (this.boCountryCode === 'LV') {
      this.paymentType='VKT';
    } else if (this.boCountryCode === 'LT') {
      this.paymentType='LKT';
    } else if (this.boCountryCode === 'EE') {
      this.paymentType='TKT';
      
    }
    this.getPaymentMetaData(this.paymentType, '')
    console.log('before calling service')
  }

  chageText(textboxvalue: any) {
    textboxvalue.value = '';
  }
  ngDoCheck() {
    if (this.input_fromScreen.SendersAccountId && !this.isCurrencyLoaded) {
      this.commonfunctions.changeflag(this.input_fromScreen.SendersAccountId, this.paymentType, this.paymentmetadata);
      this.isCurrencyLoaded = true;
    }
  }
  getPaymentTypes() {
    this._userService.paymentTypes(this.CallerFunction).
      subscribe((result) => {
        this.paymentTypesList = result.PaymentTypes;
        if (this.boCountryCode === 'LV') {
          this.creditor_model.PaymentCategory='VKT';
        } else if (this.boCountryCode === "LT") {
          this.creditor_model.PaymentCategory='LKT';
        } else if (this.boCountryCode === 'EE') {
          this.creditor_model.PaymentCategory='TKT';
        }
      })
  }
  getUserSettings() {
    this._userService.userSettings().
      subscribe((result) => {
        this.userSettings = result;
        //   this.userSettings.IsRestricted = "Y";
        // this.userSettings.MayCreateCreditors='N';
      })
  }
  getPaymentMetaData(paymenttype: string, viewuser: string) {
    this.isLoading = true;
    this._userService.getpaymentmetadata(paymenttype, viewuser).subscribe(result => {
      this.paymentmetadata = result;
      this.isLoading = false;
      this.senderAccount = [];
      for (let i = 0; i < this.paymentmetadata.FromAccounts.length; i++) {
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
      // if (this.userSettings.DefaultFromAccountId != '') {
      //   this.creditorData.senderAccount = this.userSettings.DefaultFromAccountId;
      // }
      // else {
      this.input_fromScreen.SendersAccountId = this.paymentmetadata.FromAccounts[0].FromAccountsItem.IdKtFrom;
      // }
    });
  }
  handleDataForSenderAC() {
    this.commonfunctions.changeflag(this.input_fromScreen.SendersAccountId, 'LKT', this.paymentmetadata);
  }

  private GetCreditor(Pay_catg: string, Cdr_id: string, Cdr_status: string, Templt_id: string, Templt_status: string) {
    this._userService.getViewCreditor(Pay_catg, Cdr_id, Cdr_status, Templt_id, Templt_status)
      .subscribe(result => {
        (this.creditordata = result);

        this.input_fromScreen.CreditorNameId = this.creditordata.CreditorNameId.trim();
        this.input_fromScreen.CreditorName = this.creditordata.CreditorName.trim();
        this.creditor_model.PaymentCategory =Pay_catg;
        this.input_fromScreen.PaymentCurrency = this.creditordata.PaymentCurrency.trim();
        this.input_fromScreen.CreditorId = this.creditordata.CreditorId.trim();
        this.input_fromScreen.CreditorStatus = this.creditordata.CreditorStatus.trim();
        this.input_fromScreen.TemplateId = this.creditordata.TemplateId.trim();
        this.input_fromScreen.TemplateStatus = this.creditordata.TemplateStatus.trim();
        this.input_fromScreen.SendersAccountId = this.creditordata.SendersAccountId.trim();
        this.input_fromScreen.BeneficiaryAccountNumber = this.creditordata.BenAccountNo.trim();
        this.creditor_Acc_type.BeneficiaryName = this.creditordata.BenName.trim();
        this.creditor_Acc_type.IsUrgent = this.creditordata.Urgent.trim();
        this.creditor_Acc_type.BeneficiaryAddress = this.creditordata.BenAddress.trim();
        this.creditor_model.IbActionTimeStamp = this.creditordata.LatestActionTime.trim();

        // this.input_fromScreen.SendersAccountId = this.creditordata.SendersAccountNo;
        console.log(this.creditordata);

      })
  }
}
