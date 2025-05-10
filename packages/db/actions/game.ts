import { prisma } from "../client";

export const getAllGames = async () => {
  return await prisma.game.findMany({ include: { product: true } });
};

export const getGameById = async (id: number) => {
  return await prisma.game.findUnique({ where: { id }, include: { product: true } });
};

export const createGame = async (data: {
  productId: number;
  platform: string;
  genre: string;
  releaseDate: Date;
}) => {
  return await prisma.game.create({ data });
};

export const updateGame = async (id: number, data: Partial<Parameters<typeof createGame>[0]>) => {
  return await prisma.game.update({ where: { id }, data });
};

export const deleteGame = async (id: number) => {
  return await prisma.game.delete({ where: { id } });
};
