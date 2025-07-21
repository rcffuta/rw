import React from "react";
import Checkout from "@/components/client/Checkout";

import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { APP_NAME } from "@rw/shared";

export const metadata: Metadata = {
    title: `Checkout | ${APP_NAME}`,
    description: `Complete your orders on ${APP_NAME}`,
    // other metadata
};

const CheckoutPage = () => {
    return (
        <main>
            <Breadcrumb title={"Checkout"} pages={[]} />
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <Checkout />
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;
