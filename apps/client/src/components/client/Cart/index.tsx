"use client";

import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import SingleItem from "./SingleItem";
import Breadcrumb from "../../Common/Breadcrumb";
import { observer } from "mobx-react-lite";
import EmptyCart from "./EmptyCart";
import { ProductItem } from "@willo/db";
import { CartItem, useCart, useCartAction } from "@/hooks/useProduct";


const CartTable = ({ items }: { items: CartItem[]}) => {
    return (
        <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                    {/* <!-- table header --> */}
                    <div className="flex items-center py-5.5 px-7.5">
                        <div className="min-w-[400px]">
                            <p className="text-dark">Product</p>
                        </div>

                        <div className="min-w-[180px]">
                            <p className="text-dark">Price</p>
                        </div>

                        <div className="min-w-[275px]">
                            <p className="text-dark">Quantity</p>
                        </div>

                        <div className="min-w-[200px]">
                            <p className="text-dark">Subtotal</p>
                        </div>

                        <div className="min-w-[50px]">
                            <p className="text-dark text-right">Action</p>
                        </div>
                    </div>

                    {/* <!-- cart item --> */}
                    {items.map((item, key) => (
                        <SingleItem item={item} key={key} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Cart = observer(() => {
    const {cartItems, isEmptyCart} = useCart();

    const { clearCart } = useCartAction({} as ProductItem);
    
    let template = <EmptyCart />;

    if (!isEmptyCart) template = (
        <>
            <CartTable items={cartItems} />

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
                <Discount />
                <OrderSummary />
            </div>
        </>
    );


    return (
        <>
            {/* <!-- ===== Breadcrumb Section Start ===== --> */}
            <section>
                <Breadcrumb title={"Cart"} pages={["Cart"]} />
            </section>
            {/* <!-- ===== Breadcrumb Section End ===== --> */}

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    {/* Header */}
                    {!isEmptyCart && (
                        <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
                            <h2 className="font-medium text-dark text-2xl">
                                Your Cart
                            </h2>

                            <button className="text-blue" onClick={clearCart}>
                                Clear Shopping Cart
                            </button>
                        </div>
                    )}

                    {template}
                </div>
            </section>
        </>
    );
});

export default Cart;
