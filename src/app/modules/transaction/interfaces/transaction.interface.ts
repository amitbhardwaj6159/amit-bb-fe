export interface ITransactionList {
    data: ITransaction[];
}

export interface ITransaction {
    categoryCode: string;
    dates: ITransDate;
    transaction: ITransactionDetail;
    merchant: IMerchant;
}

interface ITransactionDetail {
        amountCurrency: IAmountCurrency; 
        type: string;
        creditDebitIndicator: string;
}

interface IAmountCurrency {
        amount: number;
        currencyCode: string;
}

interface ITransDate {
    valueDate: number;
}

interface IMerchant {
    name: string;
    accountNumber: string;
}
export interface ISubmitTransactionPayload {
    transferTo: string;
    amount: number;
    transferFrom?: string;
}

export interface ILabels {
    [key: string]: string;
}