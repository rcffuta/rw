import { prisma } from "../client";
import { ProductFormData } from "./types";

export const getAllProducts = async () => {
  return await prisma.product.findMany({});
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id }, include: { category: true } });
};

export const createProduct = async (data: ProductFormData) => {
  return await prisma.product.create({ data });
};

export const updateProduct = async (id: number, data: Partial<Parameters<typeof createProduct>[0]>) => {
  return await prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};

export async function getProductsByCategory(categoryId?: number) {
    try {

        return await prisma.product.findMany({
            where: categoryId ? { categoryId } : {},
            // include: { category: true, images: true }, // Adjust as needed
        });
    } catch (err) {
        console.error(err);

        return []
    }
}