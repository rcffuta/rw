import { prisma } from "../client";

// ✅ Get all items in a user's cart
export async function getUserCart(userId: number) {
    return prisma.order.findMany({
        where: { userId, status: "cart" },
        include: { product: true }
    });
}

// ✅ Add product to cart (or update quantity if it already exists)
export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const existing = await prisma.order.findFirst({
    where: {
      userId,
      productId,
      status: "cart"
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
      status: "cart"
    }
  });
}

// ✅ Update cart item quantity
export async function updateCartItem(userId: number, productId: number, quantity: number) {
  return prisma.order.updateMany({
    where: {
      userId,
      productId,
      status: "cart"
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
      status: "cart"
    }
  });
}

// ✅ Clear the cart
export async function clearCart(userId: number) {
  return prisma.order.deleteMany({
    where: {
      userId,
      status: "cart"
    }
  });
}

// ✅ Checkout — mark all cart items as paid
export async function checkoutCart(userId: number) {
  return prisma.order.updateMany({
    where: {
      userId,
      status: "cart"
    },
    data: {
      status: "paid"
    }
  });
}