import { prisma } from "../client";
import { ProductFormData } from "./types";

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { category: true, game: true, book: true, giftCard: true },
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true, game: true, book: true, giftCard: true },
  });
}

export async function createProduct(data: ProductFormData) {
  return await prisma.product.create({ data });
}

export async function updateProduct(id: number, data: any) {
  return await prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({ where: { id } });
}
