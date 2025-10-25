import type {
    ApiRequestBody,
    ApiResponse, GetTransactionResponse,
    ProcessTransactionBody,
    ProcessTransactionResponse
} from "./types";

export { PaymentMethod } from "./types";

interface PlategaArgs {
    merchantId: string,
    secret: string,
    apiServer?: string
}

export class PlategaClient {
    private readonly merchantId: string;
    private readonly secret: string;
    private readonly apiServer: string;

    /**
     * Initializes a new instance of the PlategaClient class.
     * @param merchantId - Your Platega merchant ID.
     * @param secret - Your Platega API key.
     * @param apiServer - (Optional) The Platega API server URL. Defaults to "https://app.platega.io".
     */
    constructor({ merchantId, secret, apiServer = "https://app.platega.io" }: PlategaArgs) {
        this.merchantId = merchantId;
        this.secret = secret;
        this.apiServer = apiServer;
    }

    private _request = async <T extends ApiResponse>(url: string, method: "POST" | "GET", body?: ApiRequestBody): Promise<T> => {
        const req = await fetch(url, {
            method: method,
            headers: {
                "X-MerchantId": this.merchantId,
                "X-Secret": this.secret,
                "Content-Type": "application/json"
            }, body: JSON.stringify(body)
        });
        if (!req.ok) {
            throw new Error(`Platega API request failed with status ${req.status}: ${await req.text()}`);
        }

        return await req.json() as T;

    }

    processTransaction = async (body: ProcessTransactionBody) => this._request<ProcessTransactionResponse>(`${this.apiServer}/transaction/process`, "POST", body)

    getTransaction = async (transactionId: string) => this._request<GetTransactionResponse>(`${this.apiServer}/transaction/${transactionId}`, "GET")

}