"use client";
import React from "react";
import { cartStore } from '@/lib/store/cart-utils'
import productStore from "@/lib/store/productStore";
import wishlistStore from "@/lib/store/wishlistStore";
import { ProductInfo } from "@rcffuta/ict-lib";
import { formatCurrency, formatNaira, useFormatCurrency } from "@rw/shared";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


type OrderPrice = {
    amount: number;
    amountText: string;
}

type OrderSummary = {
    orderTotal: number;
    summary: {
        title: string;
        amount: number;
        amountText: string;
    }[]
};

export type CartItem = {
    product: any,
    quantity: number;
}


function sum(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}


function determinePrice(item: ProductInfo) {
    // if (item.price < item.discountedPrice)
    //     return item.discountedPrice;

    return item.price;
}





export function useProduct(product: ProductInfo) {
    const { price, ...rest } = product

    const parseFigure = useFormatCurrency()

    // const isDiscount = useMemo(() => {
    //     return discountedPrice > 0 && discountedPrice < normalPrice
    // }, [normalPrice, discountedPrice])

    const getOrderItemPrice = useCallback(
        (ordQty: number) => {
            const total = price * ordQty

            return {
                amount: total,
                amountText: parseFigure(total),
            }
        },
        [price]
    )

    return {
        price,
        // discountedPrice,
        priceText: formatNaira(price),
        // discountedPriceText: formatNaira(discountedPrice),
        isDiscount: false,
        getOrderItemPrice,
        ...rest,
    }
}

export function useCart() {
    const parseFigure = useFormatCurrency();

    const cart = cartStore.items;

    const cartPrice = cartStore.totalPrice;

    const cartToastId = "emptyCartToast";

    const getOrderPrice = useCallback((order: any) => {
        const total = determinePrice(order.product) * order.quantity;

        return {
            amount: total,
            amountText: formatCurrency(total),
        };
    }, [])

    const getOrderSummary = useCallback((): OrderSummary  => {
        return cart.reduce(
            (acc, item): OrderSummary => {
                const ordPrice = getOrderPrice(item);

                acc.orderTotal = acc.orderTotal + ordPrice.amount;
                acc.summary.push({
                    ...ordPrice,
                    title: `${item.name} ${item.quantity > 1 ? `(x${item.quantity})` : ""}`,
                });

                return acc;
            },
            {
                orderTotal: 0,
                summary: [],
            }
        );
    }, []);

    return {
        cart,
        cartPrice,
        cartPriceText: formatNaira(cartPrice),
        isEmptyCart: cart.length < 1,
        cartToastId,
        cartItems: cart.map((e) => ({
            product: e.name,
            quantity: e.quantity,
        })),
        getOrderSummary,
    };
}

export function useCartAction(item: any) {

    const cartToastId = "emptyCartToast";

    // const deleteFromCart = async () => {
    //     await cartStore.removeItemFromCart(item.id);
    //     toast.success("Removed from cart", {id:cartToastId});
    // }

    // const clearCart = async () => {
    //     await cartStore.removeAllItemsFromCart();
    //     toast.success("Cleared Cart", {
    //         id: cartToastId,
    //     });
    // }

    // const updateCartQuantity = async (quantity:number) => {
    //     await cartStore.updateCartItemQuantity(item.id, quantity);
    //     toast.success("Updated Cart", {
    //         id: cartToastId,
    //     });
    // }

    return {
        // deleteFromCart,
        // clearCart,
        // updateCartQuantity,
    };
}