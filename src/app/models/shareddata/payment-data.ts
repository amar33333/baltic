import { UserService } from './../../services/user.service';
import { Paymentmetadata } from './../paymentmetadata';
import { SelectItem } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
@Injectable()
export class PaymentData {
  // public currency : String
  public creditorID: any;
  public sender: any;
  public beneficiaryName: string;
  public beneficiaryAccountNumber: any;
  public beneficiarycountry: string;
  public beneficiaryAddress: string;
  public amount: any;
  public payment_type: string;
  public date: Date;
  public transferType: string;
  public referencenumber: any;
  public messageToBen: any;
  public referencenumber1: any;
  public paymentDescription1: any;
  public referencenumberRadio: boolean;

  // Account transfer binding varialbe for  validation
  public BenAccNum_AccTrnf: string;
  public isBenAccNum_AccTrnfInValid: boolean;

  public BenName_AccTrnf: string;
  public isBenName_AccTrnfInValid: boolean;

  public Amount_AccTrnf: string;
  public isAmount_AccTrnfInValid: boolean;

  public Date_AccTrnf: Date;

  public Transfer_typeAccTrnf: string;
  public isTransfer_typeAccTrnfInValid: boolean;

  public ReferenceNum_AccTrnf: string;
  public isReferenceNum_AccTrnfInValid: boolean;

  public MsgToBen_AccTrnf: string;
  public isMsgToBen_AccTrnfInValid: boolean;
  // public documentNumber: any;
  public documentNumberDate: any;
  public popup: boolean;
  public urgentFlag: boolean;
  public statisticCode: any;
  public paymentIdNumber: any;
  public mystr: string;
  public staticflag = false;
  public estoniaflag = false;
  public paytype: boolean;
  public isBeneficiaryNameValid: boolean;

  public isfolderInValid: boolean;
  public isSenderAccInValid: boolean;
  public isBeneficiaryAccInValid: boolean;
  public isAmountInValid: boolean;
  public isReferenceNumberInValid: boolean;
  public isMessageToBenInValid: boolean;
  public isDocumnetNumInValid: boolean;

  public isBeneficiaryCountryValid: boolean;
  public folderName: string;
  public sameaccount = false;

  public beneficiaryAccount: SelectItem[];
  public paymentmetadata: Paymentmetadata;

  constructor(private _userservice: UserService) {
    this.documentNumberDate = this.dateformate();
    this.Transfer_typeAccTrnf = 'N';
    this.popup = false;
    this.urgentFlag = false;
    this.paytype = false;
    this.beneficiaryAddress = '';
    this.beneficiarycountry = '';
    // this.isSenderAccValid = false;
    this.isAmountInValid = false;
    this.isfolderInValid = false;
    this.isBeneficiaryAccInValid = false;
    this.isReferenceNumberInValid = false;
    this.isMessageToBenInValid = false;
    this.isDocumnetNumInValid = false;

    this.isBeneficiaryNameValid = false;
    this.isBeneficiaryCountryValid = false;
    this.beneficiaryAccountNumber = '';
    this.beneficiaryName = '';
    this.beneficiaryAddress = '';
    this.beneficiarycountry = '';
    this.amount = '';
    this.messageToBen = '';
    this.paymentIdNumber = '';
    this.referencenumber = '';
    this.sender = null;
    

    this.isBenAccNum_AccTrnfInValid = false;
    this.isBenName_AccTrnfInValid = false;
    this.isAmount_AccTrnfInValid = false;
    this.isTransfer_typeAccTrnfInValid = false;
    this.isMsgToBen_AccTrnfInValid = false;
    this.isReferenceNum_AccTrnfInValid = false;
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
  private validateData() {
    this.isSenderAccInValid = this.sender === '';
    this.isBeneficiaryAccInValid = this.beneficiaryAccountNumber === ''
    this.isAmountInValid = this.amount === ''
    this.isfolderInValid = this.folderName === '' || this.folderName === undefined
    this.isDocumnetNumInValid = this.documentNumberDate === '' || this.documentNumberDate === undefined
    this.isMessageToBenInValid = this.referencenumber === '' && this.messageToBen === ''
    this.isReferenceNumberInValid = this.referencenumber === '' && this.messageToBen === ''

  }

  CancelUrgent() {
    this.popup = false;
    this.transferType = 'N';
    this.urgentFlag = false;
  }

  ConformUrgent() {
    this.popup = false;
    this.transferType = 'Y';
    this.beneficiaryAddress = '';
    this.beneficiarycountry = '';
    this.urgentFlag = true;
    console.log('this is  yes in pop up');
  }

  Display(type: string) {
    this.isTransfer_typeAccTrnfInValid = type === '' || type === undefined;
    console.log(type);
    this.urgentFlag =
      (type === 'Y' && this.beneficiaryAddress === '') ||
      this.beneficiarycountry === '';
    this.popup =
      type === 'Y' &&
      (this.beneficiaryAddress !== '' || this.beneficiarycountry !== '');
    this.urgentFlag = type === 'N' ? false : true;
  }

  formrset() {
    this.creditorID = '';
    // this.payment_type = 'Account transfer';
    // this.beneficiaryAccountNumber = '';
    this.beneficiaryName = '';
    this.beneficiaryAddress = '';
    this.beneficiarycountry = '';
    this.amount = '';
    this.transferType = 'Normal';
    this.messageToBen = '';
    this.paymentIdNumber = '';
    this.referencenumber = '';
    // this.sender = null;
    this.date = null;
  }

  ValidateDocNum(data: string) {
    this.isDocumnetNumInValid = data === '' || data === undefined;
  }

  savedata() {
    this.validateData();
    console.log(this.date);

  }
}
