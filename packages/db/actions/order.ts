import { prisma } from "../client";
import { FullOrder, FullOrderWithPayment } from "./types";

// ✅ Get all items in a user's cart
export async function getPaidOrder(userId: number): Promise<FullOrderWithPayment[]> {
    return prisma.order.findMany({
        where: { status: "paid" },
        include: { product: true, payment: true },
    });
}

export async function getAllOrder(): Promise<FullOrderWithPayment[]> {
    return prisma.order.findMany({
        where: {},
        include: { product: true, payment: true },
    });
}

export async function disburseOrder(orderId: number) {
  return prisma.order.update({
    where: {
      // userId,
      id: orderId,
      // status: "cart"
    },
    data: { status: "disbursed" }
  });
}

