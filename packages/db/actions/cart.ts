import { prisma } from "../client";
import { OrderItem, OrdStatus } from "./types";

// ✅ Get all items in a user's cart
export async function getUserCart(userId: number) {
    return prisma.order.findMany({
        where: { userId, status: OrdStatus.cart },
        include: { product: true }
    });
}

// ✅ Add product to cart (or update quantity if it already exists)
export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const existing = await prisma.order.findFirst({
    where: {
      userId,
      productId,
      status: OrdStatus.cart
    }
  });

  if (existing) {
    return prisma.order.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity }
    });
  }

  return prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      status: OrdStatus.cart
    }
  });
}


export async function updateCart(userId: number, items: OrderItem[]) {
  for (const item of items) {

    if (!item.id){
      addToCart(userId, item.productId, item.quantity);
      return;
    }
    
    await prisma.order.upsert({
      where: {
        id: item.id,
        userId,
        productId: item.productId,
        status: OrdStatus.cart,
        // userId,
        // productId: item.productId,
        // userId_productId: {
        // },
      },
      update: {
        quantity: item.quantity,
      },
      create: {
        userId,
        productId: item.productId,
        quantity: item.quantity,
        status: OrdStatus.cart
        // add other fields if needed
      },
    });
  }
}

// ✅ Update cart item quantity
export async function updateCartItem(userId: number, productId: number, quantity: number) {
  return prisma.order.updateMany({
    where: {
      userId,
      productId,
      status: OrdStatus.cart
    },
    data: { quantity }
  });
}

// ✅ Remove item from cart
export async function removeFromCart(userId: number, productId: number) {
  return prisma.order.deleteMany({
    where: {
      userId,
      productId,
      status: OrdStatus.cart
    }
  });
}

// ✅ Clear the cart
export async function clearCart(userId: number) {
  return prisma.order.deleteMany({
    where: {
      userId,
      status: OrdStatus.cart
    }
  });
}

// ✅ Checkout — mark all cart items as paid
export async function checkoutCart(userId: number) {
  return prisma.order.updateMany({
    where: {
      userId,
      status: OrdStatus.cart
    },
    data: {
      status: "paid"
    }
  });
}