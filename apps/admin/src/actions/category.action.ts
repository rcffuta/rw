"use server";

import { CategoryFormData, CategoryItem, createCategory, FullCategory, getAllCategories, getAllCategoriesWithProducts } from "@gamezone/db";

export async function getCategoryList(): Promise<FullCategory[]> {
    const data = await getAllCategoriesWithProducts();

    if (!data) return []

    return data;
}

export async function getCategories(): Promise<CategoryItem[]> {
    const data = await getAllCategories();

    if (!data) return []

    return data;
}

export async function saveCategory(data: CategoryFormData): Promise<CategoryItem> {
    return await createCategory(data);
}