import { prisma } from "../client";
import { GameProductFormData } from "./types";

export const getAllGames = async () => {
  return await prisma.game.findMany({ include: { product: true } });
};

export const getGameById = async (id: number) => {
  return await prisma.game.findUnique({ where: { id }, include: { product: true } });
};

export const createGame = async (data: GameProductFormData) => {
  return await prisma.game.create({
    data: {
      genre: data.genre,
      platform: data.platform,
      releaseDate: data.releaseDate,
      product: {
        connect: {
          id: data.productId,
        },
      },
    },
  });
};

export const updateGame = async (id: number, data: Partial<Parameters<typeof createGame>[0]>) => {
  return await prisma.game.update({ where: { id }, data });
};

export const deleteGame = async (id: number) => {
  return await prisma.game.delete({ where: { id } });
};
