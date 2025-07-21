"use client";
import React from "react";

import { Spinner } from "../../Common/Icons";

import { observer } from "mobx-react-lite";
import cartStore from "@/lib/store/cartStore";
import { CheckoutList } from "./CheckoutList";
import CheckoutForm from "./CheckoutForm";

const Checkout = observer(() => {
    const items = cartStore.items;
    const totalPrice = cartStore.totalPrice;
    const loading = false;

    // const {handleCheckout, loading, handleNote, handleBillingDetails, errors} = useCheckout();

    

    return (
        <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* <!-- checkout left --> */}
            <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                {/* <CheckoutForm items={items} totalPrice={totalPrice}/> */}
            </div>

            {/* // <!-- checkout right --> */}
            <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <CheckoutList
                    items={items}
                    totalPrice={totalPrice}
                />

                {/* <!-- coupon box --> */}
                {/* <Coupon /> */}

                {/* <!-- shipping box --> */}
                {/* <ShippingMethod /> */}

                {/* <!-- payment box --> */}
                {/* <PaymentMethod /> */}

                {/* <!-- checkout button --> */}
                <button
                    type={"submit"}
                    disabled={totalPrice === 0}
                    className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                    form="checkout-form"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Spinner />
                            Processing...
                        </span>
                    ) : (
                        "Proceed to Checkout"
                    )}
                </button>
            </div>
        </div>
    );
});

export default Checkout;

