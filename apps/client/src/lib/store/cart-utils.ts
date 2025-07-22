// stores/client-cart.ts
"use client";

import toast from "react-hot-toast";
import { createCartStore } from "./cartStore";
import { createNewOrder, updateOrderInfo } from "@/actions/cart.action";
import { Order, OrderRecord } from "@rcffuta/ict-lib";
import { CheckoutFormData } from "../validators/checkout.validator";

const LOCAL_CART_KEY = "guest_cart";

export function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    if (!stored) return undefined;

    return JSON.parse(stored);
  } catch (err) {
    console.warn("Cart load failed", err);
    return undefined;
  }
}

export function saveCartToStorage(cart: any) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
}


export const cartStore = createCartStore(loadCartFromStorage());



export function clearOrderState(cart: typeof cartStore) {

    cart.clearCart();
    localStorage.removeItem(LOCAL_CART_KEY);
}

// Optional: auto-persist after changes (observe if needed)

export async function persistOrder(cart: typeof cartStore, billing: CheckoutFormData) {
//   const billing = cart.billing;
  if (!billing?.email) {
    toast.error("Billing email is required.");
    return;
  }

  const orderData: Order = {
    ...cart.order,
    items: cart.items,
    status: "cart",
    customer: {
      email: billing.email,
      name: billing.firstname + " " + billing.lastname,
      phone: billing.phoneNumber,
      userId: "",
    },
    paymentRef: "",
    totalAmount: cart.totalPrice,
  };


  console.dir(orderData);

  const {
    message,
    success,
    data,
  } = await createNewOrder(orderData);

  if (!success) {
    toast.error("Failed to create order");
    return null;
  }

  cart.setOrder(data);
  saveCartToStorage({
    items: cart.items,
    billing: billing,
    order: data,
  });

  return data;
}
