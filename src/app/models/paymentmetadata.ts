export interface Paymentmetadata {
  ReturnCode: number;
  ErrorMessage: string;
  UserMayAuthCurrPaymType: string;
  ShowExchProposal: string;
  FromAccounts:
  [{
    FromAccountsItem: {
      IdKtFrom: string;
      AccountNameFrom: string;
      AccountIdFrom: string;
      CurrencyFrom: string;
    }
  }];
  ExternalFromAccounts:
   [{
    ExternalFromAccountItem: {
      E_IdKtExFrom: string;
      SwiftIdExFrom: string;
      AccountNameExFrom: string;
      AccountIdExFrom: string;
      CurrencyExFrom: string;
    }
  }];
  ToAccounts:
   [{
    ToAccountsItem: {
      IdKtTo: string;
      AccountNameTo: string;
      AccountIdTo: string;
      CurrencyTo: string;
    }
  }];
  Currencies:
  [{
    CurrenciesItem: {
      CurrencyCode: string;
      CurrencyNumDec: number;
      CurrencyText: string;
    }
  }];
  CurrenciesAlt:
  [{
    CurrenciesAltItem: {
      CurrencyCodeAlt: string;
      CurrencyNumDecAlt: number;
      CurrencyTextAlt: string;
    }
  }];
  Countries:
  [{
    CountriesItem: {
      CountryCode: string;
      CountryText: string;
    }
  }];
}



