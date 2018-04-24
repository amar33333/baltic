export class PostCreditorRequestModel {
    SessionUserId: string;
    SessionId: string;
    LanguageCode: string;
    CountryCode: string;
    ViewUser: string;
    PaymentCategory: string;
    IbActionTimeStamp: string;
    InputFromScreen: CreateInputFromScreen;
    CreditorAccTrftype: CreateCreditorAccTrftype;

}
export class CreateInputFromScreen {
    CreditorNameId: string;
    CreditorName: string;
    SendersAccountId: string;
    BeneficiaryAccountNumber: string;
    ReferenceNumber: string;
    PaymentDescription: string;
    DocumentNumber: string;
    PaymentCurrency: string;
    PaymentEndToEndId: string;
    CreditorId: string;
    CreditorStatus: string;
    TemplateId: string;
    TemplateStatus: string;
}
export class CreateCreditorAccTrftype {
    BeneficiaryName: string;
    BeneficiaryAddress: string;
    BeneficiaryCountry: string;
    IsUrgent: string;
    BeneficStatisticCodeiaryName: string;

}