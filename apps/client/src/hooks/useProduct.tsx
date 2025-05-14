"use client";

import cartStore from "@/lib/store/cartStore";
import productStore from "@/lib/store/productStore";
import wishlistStore from "@/lib/store/wishlistStore";
import { FullOrder, OrderItem, ProductItem } from "@gamezone/db";
import { formatCurrency, useFormatCurrency } from "@gamezone/lib";
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


function sum(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}


function determinePrice(item: ProductItem) {
    if (item.discountedPrice < item.discountedPrice)
        return item.discountedPrice;

    return item.price;
}

function getOrderPrice(order: FullOrder) {
    const total = determinePrice(order.product) * order.quantity;

    return {
        amount: total,
        amountText: formatCurrency(total)
    };
}


export function getOrderSummary(orders: FullOrder[]): OrderSummary {
    return orders.reduce(
        (acc, order): OrderSummary => {
            const ordPrice = getOrderPrice(order);

            acc.orderTotal = acc.orderTotal + ordPrice.amount;
            acc.summary.push({
                ...ordPrice,
                title: `${order.product.title} ${order.quantity > 1 ? `(x${order.quantity})` : ""}`,
            });

            return acc;
        },
        {
            orderTotal: 0,
            summary: [],
        }
    );
};


export function useProductAction(item: ProductItem) {
    const handleQuickViewUpdate = () => {
        // dispatch(updateQuickView({ ...item }));
        productStore.updateQuickView({ ...item });
    };
    const handleAddToCart = async () => {
        cartStore.addItemToCart(item);
        toast.success("Added Product to cart", { id: "cartAddToast" , duration: 800});
    };

    const handleAddItemToWishList = () => {
        const isInWishList = wishlistStore.isItemInWishlist(item.id);

        if (isInWishList) return handleRemoveFromCart();

        wishlistStore.addItem({
            ...item,
            // status: "available",
            // quantity: 1,
        });
        toast.success("Added Product to wishlist", {id:"wishListAddToast", duration: 800});
    };

    const handleProductDetails = () => {
        // dispatch(updateproductDetails({ ...item }));
        productStore.updateProductDetails({ ...item });
    };

    const handleRemoveFromCart = () => {
        // dispatch(removeItemFromCart(item.id));
        cartStore.removeItemFromCart(item.id);
        toast.success("Removed Product from cart", { id: "cartAddToast" , duration: 800});
    };

    const handleupdateQuantity = (quantity: number) => {
        // setQuantity(quantity + 1);
        // dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));

        cartStore.updateCartItemQuantity(item.id, quantity);
        toast.success("Updated Product in cart", { id: "cartAddToast" , duration: 800});
    };

    const handleRemoveFromWishlist = () => {
        wishlistStore.removeItem(item.id);
        toast.success("Removed Product from wishlist", { id: "wishListAddToast" , duration: 800});
    };

    const discountPercent = useMemo(() => {

        if (!item) return 0
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


export function useProduct(product: ProductItem) {

    const { price: normalPrice, discountedPrice, ...rest } = product;

    const parseFigure = useFormatCurrency();

    const price = useMemo(()=>{
        return determinePrice(product);
    }, [normalPrice, discountedPrice])

    const isDiscount = useMemo(()=>{
        return (discountedPrice > 0) && (discountedPrice < normalPrice)
    }, [normalPrice, discountedPrice])

    const getOrderItemPrice = useCallback((order: OrderItem)=>{
        const total = price * order.quantity;

        return {
            amount: total,

            amountText: parseFigure(total)

        }

    },[price, discountedPrice]);

    return {
        price,
        discountedPrice,
        priceText: parseFigure(price),
        discountedPriceText: parseFigure(discountedPrice),
        isDiscount,
        getOrderItemPrice,
        ...rest,
    };
}