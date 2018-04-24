export interface StatisticCode {
    ReturnCode: number;
    ErrorMessage: string;
    StatisticCodes:
    [{
        StatisticCodesItem: {
            StatisticCode: string;
            StatisticCodeText: string;
        }
    }]
}