import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountBalanceViewModel } from './models/view/accountbalance.viewmodel';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
// import {Router} from '@angular/router-deprecated';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app';
  // model = { languageCode: '', countryCode: '', accountId: '', productNumber: '' };
  // res = new AccountBalanceViewModel();

  constructor(private activatedRoute: ActivatedRoute, private _router: Router) {

  }

  ngOnInit() {
    let Action: string;
    let Cdr_id: string;
    let Cdr_status: string;
    let Templt_id: string;
    let Templt_status: string;
    let Pay_catg: string;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
   
      if (!params.hasOwnProperty("Action")) return;
      Action = params['Action'];
      Cdr_id = params['cdrid'];
      Cdr_status = params['cdrstatus'];
      Templt_id = params['tempid'];
      Templt_status = params['tempstatus'];
      Pay_catg = params['paycatg'] || '';

     
      if (Action === 'createPayment') {
        this._router.navigate(['/'],
          {
            // Action: Action,
            // paycatg: Pay_catg,
            // cdrid: Cdr_id,
            // cdrstatus: Cdr_status,
            // tempid: Templt_id,
            // tempstatus: Templt_status
            preserveQueryParams: true 
          })
      }
      if (Action === 'viewPayment') {
        this._router.navigate(['/view/'],{preserveQueryParams: true})
      }
      if (Action === 'copyPayment') {
        this._router.navigate(['/copy'])
      }
      if (Action === 'editPayment') {
        this._router.navigate(['/edit'])
      }
      if (Action === 'deletePayment') {
        this._router.navigate(['/view'])
      }
      if (Action === 'authorisePayment') {
        this._router.navigate(['/view'])
      }
      if (Action === 'createCreditor') {
        this._router.navigate(['/createcreditor'])
      }
      if (Action === 'viewCreditor') {
        this._router.navigate(['/viewcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'copyCreditor') {
        this._router.navigate(['/createcreditor'], { preserveQueryParams: true })
      }
      if (Action === 'editCreditor') {
        this._router.navigate(['/createcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'deleteCreditor') {
        this._router.navigate(['/viewcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'copyDraft') {
        this._router.navigate(['/createcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'editDraft') {
        this._router.navigate(['/createcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'deleteDraft') {
        this._router.navigate(['/viewcreditor'], { preserveQueryParams: true })

      }
      if (Action === 'authoriseCreditor') {
        this._router.navigate(['/viewcreditor'], { preserveQueryParams: true })

        // this._router.navigate(['/viewcreditor',
        //   {
        //     pay_catg: Pay_catg,
        //     cdr_id: Cdr_id,
        //     cdr_status: Cdr_status,
        //     templt_id: Templt_id,
        //     templt_status: Templt_status
        //   }])
      }

    });

  }
}
