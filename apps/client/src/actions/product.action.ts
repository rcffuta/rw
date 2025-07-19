"use server";

import { getPackageById} from "@rcffuta/ict-lib";
// import { CategoryItem, FullBookProduct, FullGameProduct, getAllBooks, getAllCategories, getAllGames, getAllProducts,getAllCategoryWithProducts, ProductItem } from "@willo/db";


// export async function getBookProducts(): Promise<FullBookProduct[]> {
//     try {

//         return await getAllBooks() || [];
//     } catch(err) {
//         console.error(err);
//         throw new Error("Could not get book products");
//     }
// }

// export async function getGameProducts(): Promise<FullGameProduct[]> {
//     try {
//         return await getAllGames() || [];
//     } catch (err) {
//         console.error(err);
//         throw new Error("Could not get game products");
//     }
// }

// export async function getAllProductList(): Promise<ProductItem[]> {
//     try {
//         return await getAllProducts() || [];
//     } catch (err) {
//         console.error(err);
//         throw new Error("Could not get all products");
//     }
// }

export async function getCategoryProducts(categoryId:string) {
    try {
        return await getPackageById(categoryId);
    } catch (err) {
        console.error(err);
        return [];
    }
}
