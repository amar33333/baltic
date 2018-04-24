import { TestBed, inject } from '@angular/core/testing';
import {  Headers,  Http,  RequestOptions,  Response,  XHRBackend, ResponseOptions} from '@angular/http';
import { HttpModule } from '@angular/http';
import { UserService } from './user.service';
import { MockBackend ,MockConnection} from '@angular/http/testing';
describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [UserService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('Testing user setting service', 
  inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse = {
      "ReturnCode": 0,
      "ErrorMessage": null,
      " DefaultFromAccountId": '',
      "DefaultSavePaymentInFolder": 'N',
      "MayCreateFolderWithConfPaym": 'Y',
      "IsRestricted": 'N',
      "MayCreateCreditors": 'Y'
    };
    
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
   
    userService.userSettings().map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));

  it('Testing folder service', inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse = {
      "ReturnCode": 0,
      "ErrorMessage": "",
      "Folders":
        [{
"FoldersItem":
            {
"FolderId": "18031600009",
"FolderText": "16032018-5G7285-con9"
            }
        }
        ]
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    userService.foldersList().map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));
  it('Testing get creditor service', inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse = {
      "ReturnCode": 0,
      "ErrorMessage": null,
      "CreditorId": "0000238308",
      "CreditorStatus": "DRAFT",
      "CreditorStatusText": "Authorisation needed - creation",
      "CreditorNameId": "resBBAN",
      "CreditorName": "SAJAI Creditor",
      "SendersAccountId": "",
      "SendersAccountNo": "",
      "BenAccountNo": "",
      "TemplateId": "0000102305",
      "TemplateStatus": "DRAFT",
      "PaymentTypeText": "Account transfer",
      "CreditorCreatedBy": "9K7651",
      "CreditorCreatedTime": "CPS 9K7651/0F2714",
      "CreditorCreatedName": "",
      "CreditorFirstAuthorisedBy": "",
      "CreditorFirstAuthorisedTime": "",
      "CreditorFirstAuthorisedName": "",
      "CreditorSecondAuthorisedBy": "",
      "CreditorSecondAuthorisedTime": "",
      "CreditorSecondAuthorisedName": "",
      "LatestActionTime": "2016-09-20-05.38.17.859948",
      "CreateCreditorAllowed": "Y",
      "AuthoriseCreditorAllowed": "Y",
      "ReferenceNumber": "",
      "PaymentDescription": "",
      "DocumentNumber": "",
      "PaymentCurrency": "",
      "BenName": "",
      "PaymentEndToEndId": "",
      "BenAddress": "",
      "BenCountry": "",
      "Urgent": "",
      "StatisticCode": ""
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    userService.getViewCreditor("LKT", "13343445", "ACTIVE", "10245566", "ACTIVE").map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));
  it('Testing create creditor service', inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse = {
      "ReturnCode": 0,
      "ErrorMessage": null,
      "CreditorInfo": {
        "CreditorId": "0000238949",
        "TemplateId": "0000102944"
      }
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    userService.addCreditor(Object).map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));
  it('Testing delete creditor service', inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse ={
      "ReturnCode":0,
      "ErrorMessage":null
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    userService.addCreditor(Object).map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));
  it('Testing get payment types service', inject([UserService, XHRBackend], (userService, mockBackend) => {
    const mockResponse ={
      "ReturnCode":0,
      "ErrorMessage":"",
      "PaymentTypes":
      [{"PaymentTypesItem":
      {"PaymentType":"VKT",
      "PaymentTypeText":"Account transfer"}},
      {"PaymentTypesItem":
      {"PaymentType":"OEV",
      "PaymentTypeText":"Account transfer - Internal"}},
      {"PaymentTypesItem":
      {"PaymentType":"UBB",
      "PaymentTypeText":"Transfer abroad"
    }}]};
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    userService.paymentTypes(Object).map((result) => {
      expect(result).toBe(mockResponse, 'result');
    });
  }));

});
