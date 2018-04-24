import { Paymentmetadata } from './../paymentmetadata';
import { SelectItem } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { concat } from 'rxjs/operators/concat';
@Injectable()
export class CommonFunctions {
    public currencies = [];
    public sender: any;
    public mystr: string;
    public staticflag = false;
    public estoniaflag = false;
    public sameaccount = false;
    public beneficiaryAccount: SelectItem[];
    public paymentmetadata: Paymentmetadata;
    public isBalance:boolean;
    constructor() {
        this.sender = null;
        this. isBalance= false;
    }
    changeflag(val: string, paymentType: string, paymentMetadata: Paymentmetadata ) {
        this.isBalance=false;
        console.log(val);
        console.log(paymentType);
        console.log(paymentMetadata);
        console.log(this.sameaccount);
        this.currencies = [];
        if (paymentType === 'OEL' || 'OEV' || 'OET') {
            this.paymentmetadata = paymentMetadata;
            this.sender = val;
            if (this.sameaccount) {
                this.beneficiaryAccount = [];
                for (let i = 0; i < this.paymentmetadata.ToAccounts.length; i++) {
                    if (
                        this.paymentmetadata.ToAccounts[i].ToAccountsItem.IdKtTo ===
                        this.sender
                    ) {
                        this.beneficiaryAccount.push({
                            label:
                                this.paymentmetadata.ToAccounts[i].ToAccountsItem
                                    .AccountNameTo +
                                '#' +
                                this.paymentmetadata.ToAccounts[i].ToAccountsItem
                                    .AccountIdTo +
                                '  ' +
                                this.paymentmetadata.ToAccounts[i].ToAccountsItem.CurrencyTo,
                            value: this.paymentmetadata.ToAccounts[i].ToAccountsItem
                                .IdKtTo
                        });
                    }
                }
            }
            let accountid;
            const cur = [];
            if (this.paymentmetadata) {
                if (this.paymentmetadata.FromAccounts.length > 0) {
                    for (let i = 0; i < this.paymentmetadata.FromAccounts.length; i++) {
                        if (this.paymentmetadata.FromAccounts[i].FromAccountsItem.IdKtFrom === this.sender) {
                            accountid = this.paymentmetadata.FromAccounts[i].FromAccountsItem.AccountIdFrom;
                        }
                    }
                    for (let i = 0; i < this.paymentmetadata.FromAccounts.length; i++) {
                        if (this.paymentmetadata.FromAccounts[i].FromAccountsItem.AccountIdFrom === accountid) {
                            cur.push(this.paymentmetadata.FromAccounts[i].FromAccountsItem.CurrencyFrom);
                        }
                    }
                }
                for (let i = 0; i < this.paymentmetadata.Currencies.length; i++) {
                    if (
                        cur.includes(
                            this.paymentmetadata.Currencies[i].CurrenciesItem.CurrencyCode
                        )
                    ) {
                        this.currencies.push(this.paymentmetadata.Currencies[i]);
                    }
                }
                console.log(cur);
            }
            console.log(this.currencies);
        }
        this.mystr = val.slice(0, 2);
        if (this.mystr === 'LV') {
            this.staticflag = true;
        } else {
            this.staticflag = false;
        }
        if (this.mystr === 'EE') {
            this.estoniaflag = true;
        } else {
            this.estoniaflag = false;
        }
    }
}
