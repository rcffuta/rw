"use server";

import { Category, getAllCategories } from "@gamezone/db";

export async function getCategoryList(): Promise<Category[]> {
    return await getAllCategories();
}