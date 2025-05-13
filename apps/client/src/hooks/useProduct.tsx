"use client";

import cartStore from "@/lib/store/cartStore";
import productStore from "@/lib/store/productStore";
import wishlistStore from "@/lib/store/wishlistStore";
import { FullProduct, OrderItem, ProductItem } from "@gamezone/db";
import { useFormatCurrency } from "@gamezone/lib";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


type OrderPrice = {
    amount: number;
    amountText: string;
}

type OrderSummary = {
    [k: string]: OrderPrice;
};


function sum(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

export function useProductAction(item: FullProduct) {
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


export function useProduct(item: ProductItem) {

    const {price:normalPrice, discountedPrice, ...rest} = item;

    const parseFigure = useFormatCurrency();

    function determinePrice(item: ProductItem) {
        if (item.discountedPrice > 0) return item.discountedPrice;

        return item.price;
    }

    const price = useMemo(()=>{
        return determinePrice(item);
    }, [normalPrice, discountedPrice])

    const isDiscount = useMemo(()=>{
        return (discountedPrice < normalPrice)
    }, [normalPrice, discountedPrice])

    const getOrderPrice = useCallback((order: OrderItem)=>{
        const total = price * order.quantity;

        return {
            amount: total,

            amountText: parseFigure(total)

        }

    },[price, discountedPrice]);

    const getAnyOrderPrice = useCallback((order: OrderItem, item: ProductItem): OrderPrice =>{
        const total = determinePrice(item) * order.quantity;

        return {
            amount: total,

            amountText: parseFigure(total)

        }

    },[price, discountedPrice])

    const getOrderSummary = useCallback((orders: OrderItem[])=>{
        let sumTotal = 0;
        const totals: OrderSummary = orders.reduce((acc, val) => {
            const tot = getAnyOrderPrice(val, item);

            sumTotal += tot.amount;

            return {
                ...acc,
                [val.productId]: tot.amountText,
            };
        }, {} as OrderSummary);

        return {
            total: sumTotal,
            totals
        }

    },[])

    return {
        price,
        discountedPrice,
        priceText: parseFigure(price),
        discountedPriceText: parseFigure(price),
        isDiscount,
        getOrderPrice,
        getOrderSummary,
        ...rest,
    };
}