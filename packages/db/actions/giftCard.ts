import { prisma } from "../client";

export const getAllGiftCards = async () => {
  return await prisma.giftCard.findMany({ include: { product: true } });
};

export const getGiftCardById = async (id: number) => {
  return await prisma.giftCard.findUnique({ where: { id }, include: { product: true } });
};

export const createGiftCard = async (data: {
  productId: number;
  code: string;
  value: number;
  expiration: Date;
}) => {
  return await prisma.giftCard.create({
    data: {
      code: data.code,
      value: data.value,
      expiration: data.expiration,
      product: {
        connect: {
          id: data.productId,
        },
      },
    },
  });
};

export const updateGiftCard = async (id: number, data: Partial<Parameters<typeof createGiftCard>[0]>) => {
  return await prisma.giftCard.update({ where: { id }, data });
};

export const deleteGiftCard = async (id: number) => {
  return await prisma.giftCard.delete({ where: { id } });
};