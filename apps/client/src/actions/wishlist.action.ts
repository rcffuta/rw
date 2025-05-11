"use server";

import { addToWishlist, Category, clearWishlist, getAllCategories, getUserWishlist, Product, removeFromWishlist, User } from "@gamezone/db";

export async function loadWishList(userId: number) {
    return await getUserWishlist(userId);
}

export async function saveWishList(userId: number, productId:number) {
    return await addToWishlist(userId, productId);
}

export async function deleteFromWishList(userId: number, productId:number) {
    return await removeFromWishlist(userId, productId);
}

export async function clearAllInWishList(userId: number) {
    return await clearWishlist(userId);
}