import { AccountBalanceViewModel } from '../models/view/accountbalance.viewmodel';
import { ApiEndpoints } from './../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccountBalance(languageCode: string, countryCode: string, accountId: string, productNumber: string)
  : Observable<AccountBalanceViewModel> {
      return this.http.post<AccountBalanceViewModel>(ApiEndpoints.POST_ACCOUNT_BALANCE, {
        languageCode: languageCode,
        countryCode: countryCode,
        accountId: accountId,
        productNumber: productNumber
      });
  }
}
