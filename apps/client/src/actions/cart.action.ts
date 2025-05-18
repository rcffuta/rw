"use server"

import { addToCart, checkoutCart, clearCart, OrderWithProduct, getUserCart, OrderItem, removeFromCart, updateCart, updateCartItem } from "@willo/db"

export async function saveCartItemToDb(user:number, items: OrderWithProduct[]) {
    try {

        return await updateCart(user, items);
    } catch (err) {
        console.error(err);

        throw new Error("Could not save cart item");
    }
}

export async function loadCart(userId: number): Promise<OrderWithProduct[]> {
    try {

        return await getUserCart(userId);
    } catch (err) {
        console.error(err);
        throw new Error("Could not load cart");
    }
}

export async function addProductToCart(userId: number, productId: number, quantity: number = 1): Promise<OrderItem> {
    try {

        return await addToCart(userId, productId, quantity);
    } catch (err){
        console.error(err);
        throw new Error("Could not add product to cart");
    }
}

export async function removeProductFromCart(userId: number, productId: number) {
    try {

        return await removeFromCart(userId, productId);
    } catch (err) {
        console.error(err);
        throw new Error("Could not remove product from cart");
    }
}

export async function clearProductFromCart(userId: number) {
    try {

        return await clearCart(userId);
    } catch (err) {
        console.error(err);
        throw new Error("Could not clear Cart");
    }
}

export async function updateProductInCart(userId: number, productId: number, quantity: number){
    try {

        return await updateCartItem(userId, productId, quantity);
    } catch(err){
        console.error(err);
        throw new Error("Could not Update product in Cart");
    }
}

export async function checkoutProduct(userId: number){
    try {

        return await checkoutCart(userId);
    } catch(err) {
        console.error(err);
        throw new Error("Could not checkout product");
    }
}
