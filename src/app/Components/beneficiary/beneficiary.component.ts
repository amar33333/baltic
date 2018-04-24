import { Paymentmetadata } from './../../models/paymentmetadata';
import { CalendarModule, DialogModule, SelectItem } from 'primeng/primeng';
import { CreatePaymentComponent } from '../../Components/create-payment/create-payment.component';
import { PaymentData } from './../../models/shareddata/payment-data';
import { UserService } from './../../services/user.service';
import { Settings } from './../../models/Settings';
import { Component, OnInit, Input, EventEmitter, Output, Host } from '@angular/core';
import { NgFor } from '@angular/common/src/directives/ng_for_of';
import { forEach } from '@angular/router/src/utils/collection';
import { DateHandelrService } from './../../models/date-handelr.service';
import { CommonFunctions } from './../../models/shareddata/common-functions';
import { PostCreditorRequestModel } from './../../creditor-object';
import { CreateInputFromScreen } from './../../creditor-object';
import { CreateCreditorAccTrftype } from './../../creditor-object';
import { Creditordata } from './../../models/creditordata'
 import {StatisticCode} from './../../models/view/StatisticCodes';

@Component({
    selector: 'app-beneficiary',
    templateUrl: './beneficiary.component.html',
    styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
    @Input() userSettings: Settings;
    @Input() paymentMetaData: Paymentmetadata;
    @Input() creditorData: Creditordata;

    public StatisticCodeObj: StatisticCode;
    public currency: string;
    public isGetCreditorSuccessed: boolean;
    public sender: any[];
    public creditor_NameId: string;
    public creditor_Name: string;
    public currencytext: string;
    public placeholderAmut = 'NN,NNN.NN';
    public statCode: SelectItem[];
    public inputStatisticCode: string;
    public minDateValue: Date;

        public updateCreditorData: any;

    public creditor_model: PostCreditorRequestModel;
    public input_fromScreen: CreateInputFromScreen;
    public creditor_Acc_type: CreateCreditorAccTrftype;

    constructor(private _userService: UserService, public paymentData: PaymentData, public dateHandler: DateHandelrService, public commanData: CommonFunctions) {
        this.statCode = [];
        this.statCode.push({ label: 'select statistic code', value: '' });
        this.minDateValue = new Date();

        this.isGetCreditorSuccessed = false;
    }
    // Business Online settings
    public numberFormatBo = window['boDecimalSeparator'];
    public boDateFormat = window['boDateFormat'];
    public boCountryCode = window['boCountryCode'];
    public boViewUser = window['boViewUser'];


    ngOnInit() {
        // this.bocountryCode = 'LV';
        // this.boDateFormat = 'yyyy/MM/dd';
        // this.numberFormatBo = '.';
        // this.commanData.changeflag(this.paymentData.sender,this.paymentData.payment_type,this.paymentMetaData)
        this.creditor_model = new PostCreditorRequestModel();
        this.input_fromScreen = new CreateInputFromScreen();
        this.creditor_Acc_type = new CreateCreditorAccTrftype();
         this.getstatisticcodes()
        
    }
    getstatisticcodes(){
        this._userService.statisticCodes().subscribe((result => {
            this.StatisticCodeObj = result;
            console.log(result);
            this.statCode = [];
            for (let i = 0; i < result.StatisticCodes.length; i++) {
                this.statCode.push({
                    label:
                        this.StatisticCodeObj.StatisticCodes[i].StatisticCodesItem.StatisticCode +
                        '-' + this.StatisticCodeObj.StatisticCodes[i].StatisticCodesItem.StatisticCodeText,
                    value: i
            })

        }
        
    })
    )
    }
    SaveCreditor() {
        this.input_fromScreen.CreditorNameId = this.creditor_NameId;
        this.input_fromScreen.CreditorName = this.creditor_Name;
        this.input_fromScreen.PaymentCurrency = this.currency;
        this.input_fromScreen.SendersAccountId = this.paymentData.sender;
        this.input_fromScreen.BeneficiaryAccountNumber = this.paymentData.beneficiaryAccountNumber;
        this.input_fromScreen.ReferenceNumber = this.paymentData.referencenumber;
        this.input_fromScreen.DocumentNumber = this.paymentData.documentNumberDate;
        this.input_fromScreen.PaymentEndToEndId = this.paymentData.paymentIdNumber;
        this.input_fromScreen.PaymentDescription = this.paymentData.messageToBen;
        this.creditor_Acc_type.BeneficiaryAddress = this.paymentData.beneficiaryAddress;
        this.creditor_Acc_type.BeneficiaryCountry = this.paymentData.beneficiarycountry;
        this.creditor_Acc_type.BeneficiaryName = this.paymentData.beneficiaryName;
        this.creditor_Acc_type.IsUrgent = this.paymentData.transferType;

        this.creditor_model.PaymentCategory = this.paymentData.payment_type;
        this.creditor_model.InputFromScreen = this.input_fromScreen;
        this.creditor_model.CreditorAccTrftype = this.creditor_Acc_type;
        console.log(this.creditor_model);

        this._userService.addCreditor(this.creditor_model).subscribe(result => {
            if (result.ReturnCode = 0) {

            }
            console.log(result);
        })
    }
    UpdateCreditor() {
        this.input_fromScreen.CreditorNameId = this.creditorData.CreditorNameId;
        this.input_fromScreen.CreditorName = this.creditorData.CreditorName;
        this.input_fromScreen.PaymentCurrency = this.creditorData.PaymentCurrency;
        this.input_fromScreen.SendersAccountId = this.creditorData.SendersAccountId;
        this.input_fromScreen.BeneficiaryAccountNumber = this.creditorData.BenAccountNo;
        this.input_fromScreen.ReferenceNumber = this.creditorData.ReferenceNumber;
        this.input_fromScreen.DocumentNumber = this.creditorData.DocumentNumber;
        this.input_fromScreen.PaymentEndToEndId = this.creditorData.PaymentEndToEndId;
        this.input_fromScreen.PaymentDescription = this.creditorData.PaymentDescription;
        this.creditor_Acc_type.BeneficiaryAddress = this.creditorData.BenAddress;
        this.creditor_Acc_type.BeneficiaryCountry = this.creditorData.BenCountry;
        this.creditor_Acc_type.BeneficiaryName = this.creditorData.BenName;
        this.creditor_Acc_type.IsUrgent = this.creditorData.Urgent;
        this.creditor_model.PaymentCategory = this.creditorData.PaymentTypeText;
        this.creditor_model.IbActionTimeStamp = this.creditorData.LatestActionTime;

        this.input_fromScreen.DocumentNumber = this.paymentData.documentNumberDate;
        this.creditor_model.InputFromScreen = this.input_fromScreen;
        this.creditor_model.CreditorAccTrftype = this.creditor_Acc_type;
        this.creditor_model.CreditorAccTrftype = this.creditor_Acc_type;

        this._userService.editCreditor(this.creditor_model).subscribe((result) => {

            console.log(result);
            console.log(result.ReturnCode);
            console.log(result.ErrorMessage);
        })

    }

    validateDate(event) {
        setTimeout(20000);
        console.log(event);
        console.log(event.target.value);
        console.log(this.paymentData.Date_AccTrnf);
    }
    validateAmount(data: any) {
        this.paymentData.isAmount_AccTrnfInValid = data === undefined || data === '';
    }

    chageText(input: any) {
        input.value = '';
    }

    benName(data: string) {
        this.paymentData.isBenName_AccTrnfInValid = data === undefined || data === '';
    }

    ValidateRefNum(data: string) {
        this.paymentData.isReferenceNum_AccTrnfInValid = data === undefined || data === '';
        console.log(this.paymentData.ReferenceNum_AccTrnf)
    }

    ValidateMsgToBen(data: string) {
        this.paymentData.isMsgToBen_AccTrnfInValid = data === undefined || data === '';
    }
    ValidateBenAccNum(data: string) {
        this.paymentData.isBenAccNum_AccTrnfInValid = data === undefined || data === '';
        console.log(data)
    }
}
