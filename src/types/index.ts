export enum PaymentMethod {
    /**
     * SBP - System of Fast Payments, QR code
     */
    SBP = 2,
    /**
     * CardRu - Card 2DS, MIR cards
     */
    CardRu = 10,
    International = 12,
}


type PaymentStatus = "PENDING" | "CONFIRMED" | "EXPIRED" | "CANCELED" | "FAILED";

export interface ApiResponse {}

export interface ApiRequestBody {}

export interface ProcessTransactionBody extends ApiRequestBody {
    paymentMethod: PaymentMethod;
    paymentDetails: {
        "amount": number;
        "currency": string;
    },
    id: string
    return: string,
    failedUrl?: string,
    description?: string;
    payload?: string
}


export interface ProcessTransactionResponse extends ApiResponse {
    paymentMethod: string,
    transactionId: string,
    redirect: string,
    status: PaymentStatus;
    return: string,
    paymentDetails: string
    expiresIn: string,
    merchantId: string,
    usdtRate: number
}

export interface GetTransactionResponse extends ApiResponse {
    id: string;
    status: PaymentStatus | string;
    paymentDetails: {
        amount: number;
        currency: string;
    };
    merchantName: string;
    mechantId: string;
    comission: number;
    paymentMethod: PaymentMethod | string;
    expiresIn: string;
    return: string;
    comissionUsdt: number;
    amountUsdt: number;
    qr: string;
    payformSuccessUrl: string;
    payload: string;
    comissionType: number;
    externalId: string;
    description: string;
}