"use client";

import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import SingleItem from "./SingleItem";
import Breadcrumb from "../../Common/Breadcrumb";
import { observer } from "mobx-react-lite";
import EmptyCart from "./EmptyCart";
import { CartItem } from "@/hooks/useProduct";
import cartStore from "@/lib/store/cartStore";
import { OrderItem } from "@rcffuta/ict-lib";
import CheckoutForm from "../Checkout/CheckoutForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "@/lib/validators/checkout.validator";
import authStore from "@/lib/store/authStore";
import toast, { ToastOptions } from "react-hot-toast";
import { PaymentDetails } from "./PaymentDetails";


const CartTable = ({ items }: { items: OrderItem[]}) => {
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
    const toastConfig: ToastOptions = {
        id: 'checkOutToast',
        duration: 5000,
    }

    const cartItems = cartStore.items;

    const isEmptyCart = cartStore.isEmptyCart;

    const user = authStore.user;
    
    let template = <EmptyCart />;

    function processCheckout(e: any) {
        e.preventDefault();

        console.debug("Processing...")
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: loading },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: user?.email,
            phoneNumber: user?.contacts
        },
    });


    const onSubmit = async (data: CheckoutFormData) => {
        
        toast.loading('Processing...', { ...toastConfig, duration: 0 })

        try {
            
            await authStore.authenticateDetails(data)
            
            cartStore.billing = data;

            toast.dismiss(toastConfig.id)

        } catch (err) {
            console.error('Error Checkout Out', err)
            toast.error(err.message, toastConfig)
        }
    }

    if (!isEmptyCart) template = (
        <>
            <CartTable items={cartItems} />

            {Boolean(cartStore.billing) ? (
                <PaymentDetails />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9"
                >
                    {/* <Discount /> */}
                    <CheckoutForm register={register} errors={errors} />
                    <OrderSummary />
                </form>
            )}
        </>
    )


    // if (cartStore.billing) template = (
    //     <>
    //         <PaymentDetails />
    //     </>
    // )


    return (
        <>
            {/* <!-- ===== Breadcrumb Section Start ===== --> */}
            <section>
                <Breadcrumb title={"Cart"} pages={[]} />
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

                            <button className="text-blue" onClick={()=>{}}>
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
