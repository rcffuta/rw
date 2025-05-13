"use server";

import { CategoryItem, FullBookProduct, FullGameProduct, getAllBooks, getAllCategories, getAllGames } from "@gamezone/db";

export async function getCategoryList(): Promise<CategoryItem[]> {
    return await getAllCategories();
}

export async function getBookProducts(): Promise<FullBookProduct[]> {
    return await getAllBooks();
}

export async function getGameProducts(): Promise<FullGameProduct[]> {
    return await getAllGames();
}