"use server"

import { addToCart, checkoutCart, clearCart, FullOrder, getUserCart, OrderItem, removeFromCart, updateCart, updateCartItem } from "@gamezone/db"

export async function saveCartItemToDb(user:number, items: FullOrder[]) {
    return await updateCart(user, items);
}

export async function loadCart(userId: number): Promise<FullOrder[]> {
    return await getUserCart(userId);
}

export async function addProductToCart(userId: number, productId: number, quantity: number = 1): Promise<OrderItem> {
    return await addToCart(userId, productId, quantity);
}

export async function removeProductFromCart(userId: number, productId: number) {
    return await removeFromCart(userId, productId);
}

export async function clearProductFromCart(userId: number) {
    return await clearCart(userId);
}

export async function updateProductInCart(userId: number, productId: number, quantity: number){
    return await updateCartItem(userId, productId, quantity);
}

export async function checkoutProduct(userId: number){
    return await checkoutCart(userId);
}
