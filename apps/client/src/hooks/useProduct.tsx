"use client";

import cartStore from "@/lib/store/cartStore";
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

export function useProductAction(item: any) {
    const handleQuickViewUpdate = () => {
        // dispatch(updateQuickView({ ...item }));
        productStore.updateQuickView({ ...item });
    };

    const handleAddToCart = async () => {
        cartStore.addItemToCart(item);
        toast.success("Added Product to cart", {
            id: "cartAddToast",
            duration: 800,
        });
    };

    const handleAddItemToWishList = () => {
        const isInWishList = wishlistStore.isItemInWishlist(item.id);

        if (isInWishList) return handleRemoveFromCart();

        wishlistStore.addItem({
            ...item,
            // status: "available",
            // quantity: 1,
        });
        toast.success("Added Product to wishlist", {
            id: "wishListAddToast",
            duration: 800,
        });
    };

    const handleProductDetails = () => {
        // dispatch(updateproductDetails({ ...item }));
        productStore.updateProductDetails({ ...item });
    };

    const handleRemoveFromCart = () => {
        // dispatch(removeItemFromCart(item.id));
        cartStore.removeItemFromCart(item.id);
        toast.success("Removed Product from cart", {
            id: "cartAddToast",
            duration: 800,
        });
    };

    const handleupdateQuantity = (quantity: number) => {
        // setQuantity(quantity + 1);
        // dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));

        cartStore.updateCartItemQuantity(item.id, quantity);
        toast.success("Updated Product in cart", {
            id: "cartAddToast",
            duration: 800,
        });
    };

    const handleRemoveFromWishlist = () => {
        wishlistStore.removeItem(item.id);
        toast.success("Removed Product from wishlist", {
            id: "wishListAddToast",
            duration: 800,
        });
    };

    const discountPercent = useMemo(() => {
        if (!item) return 0;
        if (
            item.price <= 0 ||
            item.discountedPrice <= 0 ||
            item.discountedPrice >= item.price
        )
            return 0;

        const discount =
            ((item.price - item.discountedPrice) / item.price) * 100;
        return Math.round(discount);
    }, []);

    return {
        handleAddToCart,
        handleAddItemToWishList,
        handleQuickViewUpdate,
        handleProductDetails,
        handleRemoveFromCart,
        handleupdateQuantity,
        handleRemoveFromWishlist,
        discountPercent,
    };
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
            (acc, order): OrderSummary => {
                const ordPrice = getOrderPrice(order);

                acc.orderTotal = acc.orderTotal + ordPrice.amount;
                acc.summary.push({
                    ...ordPrice,
                    title: `${order.item.name} ${order.item.quantity > 1 ? `(x${order.item.quantity})` : ""}`,
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
        cartPriceText: parseFigure(cartPrice),
        isEmptyCart: cart.length < 1,
        cartToastId,
        cartItems: cart.map((e) => ({
            product: e.item,
            quantity: e.item.quantity,
        })),
        getOrderSummary,
    };
}

export function useCartAction(item: any) {

    const cartToastId = "emptyCartToast";

    const deleteFromCart = async () => {
        await cartStore.removeItemFromCart(item.id);
        toast.success("Removed from cart", {id:cartToastId});
    }

    const clearCart = async () => {
        await cartStore.removeAllItemsFromCart();
        toast.success("Cleared Cart", {
            id: cartToastId,
        });
    }

    const updateCartQuantity = async (quantity:number) => {
        await cartStore.updateCartItemQuantity(item.id, quantity);
        toast.success("Updated Cart", {
            id: cartToastId,
        });
    }

    return {
        deleteFromCart,
        clearCart,
        updateCartQuantity,
    };
}