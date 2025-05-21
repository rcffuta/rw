"use server";
import { disburseOrder, getAllOrderInfo, OrderItem, ProductItem, UserItem } from "@willo/db";
import { Resend } from "resend";
import {DeliveryEmail} from "@/templates/Delivery";
// import { APP_ADMIN_URL } from "@willo/lib";
import { ORDER_LINK } from "@/data/links";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function loadAllPaidOrder() {
    return await getAllOrderInfo();
}

export async function sendProductToCustomer(
    order: OrderItem,
    user: UserItem,
    product: ProductItem
) {
    try {
        // 1. Send delivery email
        const { data, error } = await resend.emails.send({
            from: 'Willo <delivery@resend.dev>',
            to: [user.email],
            subject: `Your ${product.title} is ready!`,
            react: DeliveryEmail({
                customerName: user.username,
                productName: product.title,
                downloadUrl: product.deliverable,
            }) as any,
        });

        if (error) {
            console.error('Email delivery failed:', error);
            return {
                success: false,
                message: `Delivery Failed for ORD-${order.id}`,
                data: null
            };
        }

        // 2. Mark order as disbursed
        await disburseOrder(order.id);

        // // 3. Refresh by redirecting
        // return {
        //     success: true,
        //     redirect: ORDER_LINK,
        // };
        return {
            success: true,
            message: `Delivered ORD-${order.id} to ${user.email}`,
            data: {
                redirect: ORDER_LINK,
            }
        };

    } catch (err) {
        console.error('Failed to send product:', err);
        return {
            success: false,
            message: "Delivery Failed",
            data: null
        };
    }
}