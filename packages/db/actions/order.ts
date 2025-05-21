import { prisma } from "../client";
import { OrderWithProductWithPayment, OrderWithProductWithPaymentWithUser } from "./types";

// ✅ Get all items in a user's cart
export async function getPaidOrder(userId: number): Promise<OrderWithProductWithPayment[]> {
    return prisma.order.findMany({
        where: { status: "paid" },
        include: { product: true, payment: true },
    });
}

export async function getAllOrder(): Promise<OrderWithProductWithPayment[]> {
    return prisma.order.findMany({
        where: {},
        include: { product: true, payment: true },
        orderBy: {
          status: "asc",
        }
    });
}

export async function getAllOrderInfo(): Promise<OrderWithProductWithPaymentWithUser[]> {
    return prisma.order.findMany({
        where: {
          status: "paid"
        },
        include: { product: true, payment: true, user: true},
        orderBy: {
          status: "asc",
        }
    });
}

export async function disburseOrder(orderId: number) {
  return prisma.order.update({
    where: {
      // userId,
      id: orderId,
      // status: "cart"
    },
    data: { status: "disbursed", updatedAt: new Date() }
  });
}

