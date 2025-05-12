import { prisma } from "../client";

export const getAllCategories = async () => {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllCategoriesWithProducts = async () => {
  return await prisma.category.findMany({ include: { products: true } });
};

export const getCategoryById = async (id: number) => {
  return await prisma.category.findUnique({ where: { id }, include: { products: true } });
};

export const createCategory = async (data: { name: string, image: string }) => {
  return await prisma.category.create({data});
};

export const updateCategory = async (id: number, data: Partial<{ name: string }>) => {
  return await prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: number) => {
  return await prisma.category.delete({ where: { id } });
};
