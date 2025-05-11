"use server";

import { Category, FullBookProduct, FullGameProduct, getAllBooks, getAllCategories, getAllGames } from "@gamezone/db";

export async function getCategoryList(): Promise<Category[]> {
    return await getAllCategories();
}

export async function getBookProducts(): Promise<FullBookProduct[]> {
    return await getAllBooks();
}

export async function getGameProducts(): Promise<FullGameProduct[]> {
    return await getAllGames();
}