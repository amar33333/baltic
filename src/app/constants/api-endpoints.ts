import { Injectable } from '@angular/core';

@Injectable()
export class ApiEndpoints {

  // private static domainMOCK: string = 'http://v11034:84';
  private static domainMOCK:  string = '';
  // private readonly domainLOCAL: string = 'http://localhost:60279';
  //  private readonly domainTEST:  string = 'http://test-business2.danskebank';
  // private readonly domainSYST:  string = 'http://syst-business2.danskebank';
  // private readonly domainPROD:  string = 'http://business2.danskebank';

  private static urlPath = '/BN2/api/BalticPayments/';

  
  static GET_SETTINGS = ApiEndpoints.BaseUrl() + 'Payment/settings';
  static GET_PAYMENTMETADATA = ApiEndpoints.BaseUrl() + 'Payment/paymentmetadata';
  static GET_PAYMENTTYPES = ApiEndpoints.BaseUrl() + 'Payment/types';
  static GET_FOLDERSLIST = ApiEndpoints.BaseUrl() + 'Payment/paymentfolders';
  static GET_CREDITORDATA = ApiEndpoints.BaseUrl() + 'Creditor';
  static POST_CREDITORDATA = ApiEndpoints.BaseUrl() + 'Creditor';
  static AUTH_CREDITOR = ApiEndpoints.BaseUrl() + 'Creditor/authorise'
  static GET_ACCOUNTS_BALANCE_AUTHORISATION = ApiEndpoints.BaseUrl() + 'Payment/accountbalanceauthorization';
  static GET_ACCOUNT_BALANCE = ApiEndpoints.BaseUrl() + 'Account/balance';
  static GET_STATASTIC_CODE = ApiEndpoints.BaseUrl() + 'Payment/statisticcodes';
  static GET_PAYMENTINFO = ApiEndpoints.BaseUrl() + 'Payment/PaymentInfo'
  
  static GET_ACCOUNTS = ApiEndpoints.BaseUrl() + 'Baltic/api/screen/getaccounts';
  static GET_CREDITOR = ApiEndpoints.BaseUrl() + 'Baltic/api/screen/getcreditor';
  static POST_ACCOUNT_BALANCE = ApiEndpoints.BaseUrl() + 'BN2/api/BalticPayments/account/balance';
  static GET_PAYMENT_METADATA = ApiEndpoints.BaseUrl() + 'BN2/api/BalticPayments/Payment/paymentmetadata'

  // private static BaseUrl() {
  //   return this._baseUrl;
  // }

  constructor() { }

  // Returns service URL matching the current environment
  private static BaseUrl(): string {
    let newUrl = '';
    if (this.getEnvironment() == 'LOCA') {
      newUrl = this.domainMOCK + this.urlPath;
    } else {
      let url = window.location.href;
      newUrl = url.substring(0, (url.indexOf('BN2') - 1)) + this.urlPath;
    }
    return newUrl;
  }

  // Returns LOCA; TEST, SYST or PROD
  private static getEnvironment() {
    let env = window.location.href.substr(7, 4).toUpperCase();
    if (env == 'BUSI') {
      env = 'PROD';
    }
    return env;
  }

  private static getDomainExtension() {
    let url = window.location.href;
    try {
      if (this.getEnvironment() == 'LOCA') {
        return '';
      }

      let extension = url.substring(url.indexOf('danskebank') + 10, url.length);
      extension = extension.substring(1, extension.indexOf('/'));
      return extension;

    } catch (error) {
      console.error('UrlHandlerService.getDomainExtension() - Error: ');
      console.error(error);
      throw "UrlHandlerService.getDomainExtension() failed on url: " + url;
    }

  }





}


