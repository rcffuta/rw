"use server";

import {createProduct, ProductFormData} from "@gamezone/db";

export async function saveProduct(data: ProductFormData) {
    const product = await createProduct({
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        discountedPrice: data.discountedPrice,
        images: data.images,
    });

    // return product;

    console.dir(data);
    return product;
    
}