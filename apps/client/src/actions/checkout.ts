"use server";

import { CheckoutFormData } from "@/lib/validators/checkout.validator";
import { createPaymentWithOrders, FullOrder, verifyAndMarkPayment } from "db/actions";
import { User } from "db/index";

const PAY_LINK = "https://sandbox-api-d.squadco.com/transaction";

// https://sandbox-api-d.squadco.com/transaction/verify/{{transaction_ref}}
type PaymentLinkData = {
    email:string;
    amount: number,
    currency?: "NGN" | "USD",
    name: string;
    redirect?:string;
}


type CheckoutConfig = {
    totalPrice: number;
    items: FullOrder[];
    billingDetails: CheckoutFormData;
    user: User;
    redirect: string;
}

type PaymentPayload = {
    ref: string;
    amount: any;
    checkout_url: string;
};


async function createPaymentLink(data: PaymentLinkData) {
    const { amount, name: customer_name, currency="USD", redirect, email} = data;
    try {
        const body = {
            amount: amount * 100, // Amount in Kobo (50000 Kobo = 500 NGN)
            currency,
            customer_name,
            initiate_type: "inline",
            callback_url: redirect || "http://localhost:3000/verify", // Fix this
            email
        };

        const headers = {
            Authorization: `Bearer ${process.env.SQUAD_SK}`,
            "Content-Type": "application/json",
        };

        const result = await fetch(`${PAY_LINK}/initiate`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        if (!result.ok) {
            throw new Error(`Payment API Error: ${result.statusText}`);
        }

        const resp = await result.json();

        const obj = {
            ref: resp.data.transaction_ref,
            amount: resp.data.transaction_amount,
            checkout_url: resp.data.checkout_url,
        }

        console.dir(obj);

        return obj; // Return the response so frontend can use it
    } catch (error: any) {
        console.error("Payment Error:", error.message);
        console.dir(error);
        throw new Error("Failed to create payment link");
    }
}

export async function verifyPayment(reference: string) {
    
    try {

        const headers = {
            Authorization: `Bearer ${process.env.SQUAD_SK}`,
            "Content-Type": "application/json",
        };

        const result = await fetch(`${PAY_LINK}/verify/${reference}`, {
            method: "GET",
            headers,
            // body: JSON.stringify(body),
        });

        if (!result.ok) {
            console.error(new Error(`Verify Payment API Error: ${result.statusText}`));

            // console.error(result.)

            return false;

        }

        const resp = await result.json();

        const obj = {
            ref: resp.data.transaction_ref,
            amount: resp.data.transaction_amount,
            email: resp.data.merchant_email,
        }

        console.dir(obj);

        return true; // Return the response so frontend can use it
    } catch (error: any) {
        console.error("Payment Error:", error.message);
        console.dir(error);
        throw new Error("Failed to create payment link");
    }
}

export const checkoutAction = async (data: CheckoutConfig) => {
        // e.preventDefault();

    const {user, ...config} = data;

    if (config.totalPrice === 0) {

        throw new Error("Invalid cart items, please shop");
    }

    if (!user) {

        throw new Error("No User to process, please login");
    }

    const {
        billingDetails, totalPrice,
        items, redirect
    } = config


    let payObj: PaymentPayload; //payment: Payment;

    try {

        payObj = await createPaymentLink({
            email: billingDetails.email,
            amount: totalPrice,
            redirect,
            name:
                [billingDetails.firstname, billingDetails.lastname].filter(Boolean).join(" ") ||
                "Guest User",
        })
    } catch(err) {
        console.error("Checkout Error:", err);
        throw new Error("Could not reach payment service");
    }

    try{
        await createPaymentWithOrders({
            amount: payObj.amount,
            reference: payObj.ref,
            orderIds: items.map((e)=>e.id),
            userId: user.id,
        });
    }catch(err){
        console.error("Checkout Error:", err);
        throw new Error("Could not create payment");
    }


    return payObj.checkout_url;
};

export const markPaymentPaid = async (ref: string) => {
    await verifyAndMarkPayment(ref, "completed");
}

export const markPaymentFailed = async (ref: string) => {
    await verifyAndMarkPayment(ref, "failed");
}
