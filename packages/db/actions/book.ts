import { prisma } from "../client";

export const getAllBooks = async () => {
  return await prisma.book.findMany({ include: { product: true } });
};

export const getBookById = async (id: number) => {
  return await prisma.book.findUnique({ where: { id }, include: { product: true } });
};

export const createBook = async (data: {
  productId: number;
  author: string;
  genre: string;
  isbn: string;
  pages: number;
  language: string;
}) => {
  return await prisma.book.create({ data });
};

export const updateBook = async (id: number, data: Partial<Parameters<typeof createBook>[0]>) => {
  return await prisma.book.update({ where: { id }, data });
};

export const deleteBook = async (id: number) => {
  return await prisma.book.delete({ where: { id } });
};