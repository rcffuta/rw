"use client";
import cartStore from "@/lib/store/cartStore";
import productStore from "@/lib/store/productStore";
import wishlistStore from "@/lib/store/wishlistStore";
import {createContext, PropsWithChildren, useContext} from "react";
import { Product } from "@gamezone/db";

// TODO: Reduce this file to a hook

const INITIAL_CONTEXT = {
    handleItemToWishList(item: Product) {},
    handleAddToCart(item: Product) {},
    handleQuickViewUpdate(item: Product) {},
    handleProductDetails(item: Product) {},
    handleRemoveFromCart(item: Product) {},
    handleupdateQuantity(item: Product, quantity: number) {},
    handleRemoveFromWishlist(item: Product) {},
};

const ProductItemContext = createContext(INITIAL_CONTEXT);

export function useProductItemContext() {
    const context = useContext(ProductItemContext);

    if (!context) throw new Error("UseProductItemCOntext in wrong use");

    return context;
}


export function ProductItemContextProvider(props: PropsWithChildren) {
    // update the QuickView state
    const handleQuickViewUpdate = (item: Product) => {
        // dispatch(updateQuickView({ ...item }));
        productStore.updateQuickView({...item});
    };

    // add to cart
    const handleAddToCart = (item: Product) => {
        // dispatch(
        //   addItemToCart({
        //     ...item,
        //     quantity: 1,
        //   })
        // );
        cartStore.addItemToCart({
            ...item,
            quantity: 1,
        });
    };

    const handleItemToWishList = (item: Product) => {
        // dispatch(
        //   addItemToWishlist({
        //     ...item,
        //     status: "available",
        //     quantity: 1,
        //   })
        // );
        wishlistStore.addItem({
            ...item,
            status: "available",
            quantity: 1,
        });
    };

    const handleProductDetails = (item: Product) => {
        // dispatch(updateproductDetails({ ...item }));
        productStore.updateProductDetails({...item});
    };

    const handleRemoveFromCart = (item: Product) => {
        // dispatch(removeItemFromCart(item.id));
        cartStore.removeItemFromCart(item.id);
    };

    const handleupdateQuantity = (item: Product, quantity: number) => {
        // setQuantity(quantity + 1);
        // dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));

        cartStore.updateCartItemQuantity(item.id, quantity);
    };


    const handleRemoveFromWishlist = (item: Product) => {
        wishlistStore.removeItem(item.id);
    }
    
    return (
        <ProductItemContext.Provider
            value={{
                handleAddToCart,
                handleItemToWishList,
                handleQuickViewUpdate,
                handleProductDetails,
                handleRemoveFromCart,
                handleupdateQuantity,
                handleRemoveFromWishlist,
            }}
        >
            {props.children}
        </ProductItemContext.Provider>
    );
}