import {PaymentMethod, PlategaClient} from "../src";
import {test, describe} from "bun:test";
import {configDotenv} from "dotenv";
import {v4} from "uuid";
import type {ProcessTransactionResponse} from "../src/types";

configDotenv()

const merchantId = process.env.PLATEGA_MERCHANT_ID!;
const secret = process.env.PLATEGA_SECRET!;



describe("Platega Client", () => {
    const client = new PlategaClient({merchantId, secret});

    let processTransactionResponse: ProcessTransactionResponse;
    test("Process Transaction", async () => {
        const uuid = v4().toString();

        processTransactionResponse = await client.processTransaction({
            paymentMethod: PaymentMethod.SBP,
            id: uuid,
            paymentDetails: {
                amount: 100,
                currency: "RUB"
            },
            description: "meow",
            return: "https://google.com",
            failedUrl: "https://google.com",
        })

        console.log(processTransactionResponse)
    })

    test("Get Transaction", async () => {
        const getTransactionResponse = await client.getTransaction(processTransactionResponse.transactionId)
        console.log(getTransactionResponse)
    })
})