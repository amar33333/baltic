import { Creditordata } from './../models/creditordata';
import { Paymentmetadata } from './../models/paymentmetadata';
import { ApiEndpoints } from './../constants/api-endpoints';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Settings } from './../models/Settings';
import { AccountBalanceModel } from './../models/AccountBalanceModel'

import { DelCreditorObj } from './../models/CreditorDel_model'


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public accountAuthorisation(IDKT: string): Observable<any> {
    let url = ApiEndpoints.GET_ACCOUNTS_BALANCE_AUTHORISATION;
    let urlParms = '?internalAccountId=' + IDKT

    return this.http
      .get(url + urlParms)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getAccountBalance(accountid: string): Observable<any> {
    let url = ApiEndpoints.GET_ACCOUNT_BALANCE;
    let urlParms = '?accountId=' + accountid;

    return this.http
      .get(url + urlParms)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getViewData(payRef: any, paycatg: string) {
    let url = ApiEndpoints.GET_PAYMENTINFO;

    return this.http.get(ApiEndpoints.GET_PAYMENTINFO + '?PaymentreferenceNo=' + payRef + '&PaymentType=' + paycatg)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public userSettings(): Observable<Settings> {
    return this.http
      .get(ApiEndpoints.GET_SETTINGS)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public statisticCodes(): Observable<any> {
    return this.http
      .get(ApiEndpoints.GET_STATASTIC_CODE)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public foldersList(): Observable<any> {
    const url = ApiEndpoints.GET_FOLDERSLIST;
    const viewUser = '';
    const firstLineBlank = 'N';
    const newFolder = 'Y';
    const newFolderNamePart = '';
    const confidentialOnly = 'N';
    const addFindFolderLast = 'N';

    const urlParms = '?viewUser=' + viewUser + '&firstLineBlank=' + firstLineBlank + '&newFolder='
      + newFolder + '&newFolderNamePart=' + newFolderNamePart + '&confidentialOnly=' +
      confidentialOnly + '&addFindFolderLast=' + addFindFolderLast;
    return this.http
      .get(url + urlParms)
      .map(this.extractData)
      .catch(this.handleError);
  }
  public getViewCreditor(Pay_catg: string, Cdr_id: string, Cdr_status: string, Templt_id: string, Templt_status: string): Observable<Creditordata> {
    const url = ApiEndpoints.GET_CREDITORDATA;
    const PaymentCategory = Pay_catg;
    const CreditorId = Cdr_id;
    const CreditorStatus = Cdr_status;
    const TemplateId = Templt_id;
    const TemplateStatus = Templt_status
    const urlParms = '?PaymentCategory=' + Pay_catg + '&CreditorId=' + Cdr_id + '&CreditorStatus=' + Cdr_status +
      '&TemplateId=' + Templt_id + '&TemplateStatus=' + Templt_status;
    return this.http
      .get(url + urlParms)
      .map(this.extractData)

      .catch(this.handleError);
  }

  public addCreditor(Creditordata: any): Observable<any> {
    let headers;
    headers = new Headers({ 'Content-Type': 'application/json' });

    const options = new RequestOptions({ headers: headers });
    const url = ApiEndpoints.POST_CREDITORDATA;

    var body = JSON.stringify(Creditordata);

    console.log(Creditordata);

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  public deleteCreditor(DeleteAuthoriseCreditorRequestModel: DelCreditorObj): Observable<any> {
    console.log(DeleteAuthoriseCreditorRequestModel);
    const url = ApiEndpoints.POST_CREDITORDATA;
    let headers;
    headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify(DeleteAuthoriseCreditorRequestModel);
    let options = new RequestOptions({ headers: headers, body: body });
    console.log("Date Passed to Delete Method=" + options);
    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public authoriseCreditor(DeleteAuthoriseCreditorRequestModel: DelCreditorObj): Observable<any> {

    let headers;
    headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = ApiEndpoints.AUTH_CREDITOR;
    let body = JSON.stringify(DeleteAuthoriseCreditorRequestModel);
    console.log(DeleteAuthoriseCreditorRequestModel);
    console.log("Date Passed to Authorise Method=" + options);

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);



  }
  public editCreditor(Creditordata: any): Observable<any> {
    console.log("inside the update creditor");
    console.log(Creditordata);
    let headers;
    headers = new Headers({ 'Content-Type': 'application/json' });

    const options = new RequestOptions({ headers: headers });
    const url = ApiEndpoints.POST_CREDITORDATA;

    var body = JSON.stringify(Creditordata);

    console.log(Creditordata);

    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public paymentTypes(CallerFunction_: any): Observable<any> {

    const url = ApiEndpoints.GET_PAYMENTTYPES;
    const FirstLineBlank = 'N';
    const CallerFunction = CallerFunction_;
    const urlParms = '?FirstLineBlank=' + FirstLineBlank + '&CallerFunction=' + CallerFunction;

    return this.http.get(url + urlParms)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getpaymentmetadata(ptype: any, viewUser: any): Observable<Paymentmetadata> {
    return this.http.get(ApiEndpoints.GET_PAYMENTMETADATA + '?paymentType=' + (ptype || '') + '&viewUser=' + viewUser)
      .map((response: Response) => <Paymentmetadata>response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(error.message);
    return Observable.throw(error.message || error);
  }
}
