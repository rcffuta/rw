"use server";

import { CategoryItem, FullBookProduct, FullGameProduct, getAllBooks, getAllCategories, getAllGames } from "@gamezone/db";

export async function getCategoryList(): Promise<CategoryItem[]> {
    try {

        return await getAllCategories();
    } catch(err) {
        console.error(err);
        throw new Error("Could not get category list");
    }
}

export async function getBookProducts(): Promise<FullBookProduct[]> {
    try {

        return await getAllBooks();
    } catch(err) {
        console.error(err);
        throw new Error("Could not get book products");
    }
}

export async function getGameProducts(): Promise<FullGameProduct[]> {
    try {
        return await getAllGames();
    } catch (err) {
        console.error(err);
        throw new Error("Could not get game products");
    }
}