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

export async function getFilteredProducts({
    search,
    categoryId,
}: {
    search?: string;
    categoryId?: number;
}) {
    return prisma.product.findMany({
      where: {
        AND: [
          categoryId ? { categoryId } : {},
          search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
}
