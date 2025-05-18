import React from "react";
import Cart from "@/components/client/Cart";

import { Metadata } from "next";
import { APP_NAME } from "@willo/lib";
export const metadata: Metadata = {
    title: `Cart | ${APP_NAME}`,
    description: `Checkout your cart on ${APP_NAME}`,
    // other metadata
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
