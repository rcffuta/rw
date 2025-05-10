import { prisma } from "../client";

export const getAllOrders = async () => {
  return await prisma.order.findMany({ include: { items: true } });
};

export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({ where: { id }, include: { items: true } });
};

export const createOrder = async (data: { userId: number; status: string }) => {
  return await prisma.order.create({ data });
};

export const updateOrder = async (id: number, data: Partial<{ userId: number; status: string }>) => {
  return await prisma.order.update({ where: { id }, data });
};

export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({ where: { id } });
};

export const getAllOrderItems = async () => {
  return await prisma.orderItem.findMany({ include: { product: true, Order: true } });
};

export const getOrderItemById = async (id: number) => {
  return await prisma.orderItem.findUnique({ where: { id }, include: { product: true, Order: true } });
};

export const createOrderItem = async (data: { quantity: number; productId: number; orderId: number }) => {
  return await prisma.orderItem.create({ data });
};

export const updateOrderItem = async (id: number, data: Partial<{ quantity: number }>) => {
  return await prisma.orderItem.update({ where: { id }, data });
};

export const deleteOrderItem = async (id: number) => {
  return await prisma.orderItem.delete({ where: { id } });
};
