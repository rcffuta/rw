"use server"

import { createOrder, getOrders, Order, OrderRecord, updateOrder, wait } from "@rcffuta/ict-lib";

export async function createCart(order: Order) {
    try {

        return await createOrder(order);
    } catch (err) {
        console.error(err);

        throw new Error("Could not save cart item");
    }
}

export async function loadCart(userEmail: string) {
    try {

        const {
            message,
            success,
            data=[]
        } = await getOrders();


        const userCart = data.filter((e)=>e.customer.email === userEmail);

        return {
            message,
            success,
            data: userCart
        }

    } catch (err) {
        console.error(err);
        throw new Error("Could not load cart");
    }
}

export async function updateCart(orderId: string, order: Partial<OrderRecord>) {
    try {
        delete order.id;
        delete order.createdAt;
        delete order.updatedAt;
        return await updateOrder(orderId, order);
    } catch (err){
        console.error(err);
        throw new Error("Could not add product to cart");
    }
}

export async function updateOrders(orders: Partial<OrderRecord>[]) {
    try {
        await Promise.all(orders.map(e=>updateCart(e.id, e)))
    } catch (err){
        console.error(err);
        throw new Error("Could not updates orders");
    }
}

export async function clearOrders(userId: string) {
    try {
        // await Promise.all(orders.map(e=>updateCart(e.id, e)))
        await wait(5)
    } catch (err){
        console.error(err);
        throw new Error("Could not updates orders");
    }
}



export async function checkoutProduct(userId: string){
    try {

        await wait(5);
        // return await checkoutCart(userId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not checkout product");
    }
}
