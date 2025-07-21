import { CHECKOUT, SIGNIN } from "@/constants";
import authStore from "@/lib/store/authStore";
import cartStore from "@/lib/store/cartStore";
import { formatNaira, useNavigate } from "@rw/shared";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React from "react";

const OrderSummary = observer(() => {
    const isAuthenticated = authStore.isAuthenticated;

    const {redirect} = useNavigate();

    const items = cartStore.items;

    return (
        <div className="lg:max-w-[455px] w-full">
            {/* <!-- order list box --> */}
            <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                        Order Summary
                    </h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                        <div>
                            <h4 className="font-medium text-dark">Product</h4>
                        </div>
                        <div>
                            <h4 className="font-medium text-dark text-right">
                                Subtotal
                            </h4>
                        </div>
                    </div>

                    {/* <!-- product item --> */}
                    {items.map((item, key) => (
                        <div
                            key={key}
                            className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                            <div>
                                <p className="text-dark">
                                        {
                                            item.name
                                        }
                                </p>
                            </div>
                            <div>
                                <p className="text-dark text-right">
                                    {formatNaira(item.price * item.quantity)}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                        <div>
                            <p className="font-medium text-lg text-dark">Total</p>
                        </div>
                        <div>
                            <p className="font-medium text-lg text-dark text-right">
                                {cartStore.totalPrice}
                            </p>
                        </div>
                    </div>

                    {/* <!-- checkout button --> */}
                    <button
                        // href={CHECKOUT}
                        onClick={(e)=>{
                            // if(!isAuthenticated) {
                            //     e.preventDefault();
                            //     redirect(SIGNIN);
                            // }
                        }}
                        type="submit"
                        className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                    >
                        Process to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
});

export default OrderSummary;
