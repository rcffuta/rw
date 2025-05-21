"use server";

import {BookProductFormData, createBook, createGame, createGiftCard, createProduct, GameProductFormData, GiftCardProductFormData, ProductFormData} from "@willo/db";

export async function saveProduct(data: ProductFormData) {
    const product = await createProduct({
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        discountedPrice: data.discountedPrice,
        images: data.images,
        deliverable: data.deliverable
    });

    // return product;

    // console.dir(data);
    return product;
    
}

export async function saveGame(data: GameProductFormData) {
    return await createGame(data);
}

export async function saveBook(data: BookProductFormData) {
    return await createBook(data);
}

export async function saveGiftCard(data: GiftCardProductFormData) {
    return await createGiftCard(data);
}