import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Viewcreditordata } from './../../models/viewcreditordata';
import { Creditordata } from './../../models/creditordata';
import { DelCreditorObj } from './../../models/CreditorDel_model';

@Component({
  selector: 'app-view-creditor',
  templateUrl: './view-creditor.component.html',
  styleUrls: ['./view-creditor.component.css']
})
export class ViewCreditorComponent implements OnInit {
  public cdr_id: string;
  public cdr_status: string;
  public templt_id: string;
  public templt_status: string;
  public authorise: string;
  public Pay_catg: string;
  public currentURL: string;

  public creditor: Creditordata;
  public creditor_detail: boolean;
  public status_details: boolean;
  public payment_data: boolean;
  public delete: boolean;
  public auth: boolean;
  public del_draft: boolean;
  public  isLoading:Boolean
  public creditordata: Viewcreditordata;
  public DeleteCreObj: DelCreditorObj;
  public boViewUser = window['boViewUser'];

  constructor(
    private viewcreditor: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading=true;
    this.currentURL = window.location.href;
    this.delete = false;
    this.del_draft = false;
    this.auth = false;
    this.creditor_detail = true;
    this.status_details = false;
    this.payment_data = true;
    this.DeleteCreObj = {
      SessionId: '',
      SessionUserId: '',
      ViewUser: '',
      CountryCode: '',
      LanguageCode: '',
      PaymentCategory: '',
      IbActionTimeStamp: '',
      InputFromScreen: {
        CreditorId: '',
        CreditorStatus: '',
        TemplateId: '',
        TemplateStatus: ''
      }
    }

  }
  creditordetail() {
    this.creditor_detail = !this.creditor_detail;
  }
  Statusdetails() {
    this.status_details = !this.status_details;
  }
  paymentdata() {
    this.payment_data = !this.payment_data;
  }
  DeleteAuthoriseCreditro() {
    if (this.del_draft || this.delete) {
      this.DeleteCreditor();
    }
    if (this.auth) {
      this.AuthroseCreditor();
    }
  }

  DeleteCreditor() {
    this.DeleteCreObj.InputFromScreen.CreditorId = this.cdr_id;
    this.DeleteCreObj.InputFromScreen.CreditorStatus = this.cdr_status;
    this.DeleteCreObj.InputFromScreen.TemplateId = this.templt_id;
    this.DeleteCreObj.InputFromScreen.TemplateStatus = this.templt_status;
    this.DeleteCreObj.PaymentCategory= this.Pay_catg;
    console.log(this.DeleteCreObj);
    this.viewcreditor.deleteCreditor(this.DeleteCreObj).subscribe(result => {
      if (result.ReturnCode == 0) {
        const navUrl = this.currentURL.split('BN2');
        window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';
      }
    })
  }
  AuthroseCreditor() {
    this.DeleteCreObj.InputFromScreen.CreditorId = this.cdr_id;
    this.DeleteCreObj.InputFromScreen.CreditorStatus = this.cdr_status;
    this.DeleteCreObj.InputFromScreen.TemplateId = this.templt_id;
    this.DeleteCreObj.InputFromScreen.TemplateStatus = this.templt_status;
    this.DeleteCreObj.PaymentCategory= this.Pay_catg;
    
    console.log(this.DeleteCreObj);
    this.viewcreditor.authoriseCreditor(this.DeleteCreObj).subscribe(result => {
      if (result.ReturnCode == 0) {
        const navUrl = this.currentURL.split('BN2');
        window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';
      }
    })
  }
  ngOnInit() {
    let va: any;
    let Action: any;
    let Cdr_id: string;
    let Cdr_status: string;
    let Templt_id: string;
    let Templt_status: string;
    let Pay_catg: string;

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // va = params['id'];
      Action = params['Action'];
      Cdr_id = params['cdrid'];
      Cdr_status = params['cdrstatus'];
      Templt_id = params['tempid'];
      Templt_status = params['tempstatus'];
      Pay_catg = params['paycatg'] || '';
      this.Pay_catg = Pay_catg;

      if (Action === 'viewcreditor') {
        this.delete = false;
        this.del_draft = false;
        this.auth = false;
      }
      if (Action === 'deleteCreditor') {
        this.delete = true;
      }
      if (Action === 'deleteDraft') {
        this.del_draft = true;
      }

      if (Action === 'authoriseCreditor') {
        this.auth = true;
      }
      this.GetCreditor(Pay_catg, Cdr_id, Cdr_status, Templt_id, Templt_status)
    });
    
  }
  GetCreditor(Pay_catg: string, Cdr_id: string, Cdr_status: string, Templt_id: string, Templt_status: string) {
    this.isLoading = true;
    this.viewcreditor.getViewCreditor(Pay_catg, Cdr_id, Cdr_status, Templt_id, Templt_status).subscribe(result => {
      this.creditor = result;
      this.cdr_id = this.creditor.CreditorId;
      this.cdr_status = this.creditor.CreditorStatus.trim();
      this.templt_id = this.creditor.TemplateId;
      this.templt_status = this.creditor.TemplateStatus.trim();
      this.authorise = this.creditor.AuthoriseCreditorAllowed;
      this.isLoading = false;
      
      console.log(this.creditor);

    });
  }
  ListofCreditor(){
    const navUrl = this.currentURL.split('BN2');
        window.location.href = navUrl[0] + 'BN/Kreditorer/Listofcreditors.aspx';
  }
}
