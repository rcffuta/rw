import { prisma } from "../client";
import { FullWishList } from "./types";

export async function addToWishlist(userId: number, productId: number) {
  return await prisma.wishlist.upsert({
    where: {
      userId_productId: { userId, productId },
    },
    update: {},
    create: {
      userId,
      productId,
    },
  });
}

export async function removeFromWishlist(userId: number, productId: number) {
  return await prisma.wishlist.delete({
    where: {
      userId_productId: { userId, productId },
    },
  });
}

export async function getUserWishlist(userId: number): Promise<FullWishList[]> {
  return await prisma.wishlist.findMany({
    where: { userId },
    include: { product: true }, // includes full product details
    orderBy: { createdAt: "desc" },
  });
}

export async function isInWishlist(userId: number, productId: number) {
  const item = await prisma.wishlist.findUnique({
    where: {
      userId_productId: { userId, productId },
    },
  });

  return !!item;
}

export async function clearWishlist(userId: number) {
  return await prisma.wishlist.deleteMany({
    where: { userId },
  });
}