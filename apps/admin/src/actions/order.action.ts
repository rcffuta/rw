"use server";
import { getAllOrderInfo, OrderItem, ProductItem, UserItem } from "@willo/db";
import { Resend } from "resend";
import {DeliveryEmail} from "@/templates/Delivery";
import { APP_ADMIN_URL } from "@willo/lib";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function loadAllPaidOrder() {
    return await getAllOrderInfo();
}


export async function sendProductToCustomer(order: OrderItem, user: UserItem, product: ProductItem) {
    const { data, error } = await resend.emails.send({
        from: 'Willo <delivery@resend.dev>',
        to: [user.email],
        subject: 'Hello world',
        react: DeliveryEmail({
            customerName: user.username,
                productName: product.title,
                downloadUrl: `${APP_ADMIN_URL}/deliverables/book1.pdf`,
         }) as any,
    });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}
