import { prisma } from "../client";

export const getAllReviews = async () => {
  return await prisma.review.findMany({ include: { product: true } });
};

export const getReviewById = async (id: number) => {
  return await prisma.review.findUnique({ where: { id }, include: { product: true } });
};

export const createReview = async (data: { content: string; productId: number }) => {
  return await prisma.review.create({ data });
};

export const updateReview = async (id: number, data: Partial<{ content: string }>) => {
  return await prisma.review.update({ where: { id }, data });
};

export const deleteReview = async (id: number) => {
  return await prisma.review.delete({ where: { id } });
};