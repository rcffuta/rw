import React from "react";
import { Wishlist } from "@/components/client/Wishlist";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { APP_NAME } from "@rw/shared";

export const metadata: Metadata = {
    title: `Your Wishlist | ${APP_NAME}`,
    description: `Check your wishlist on ${APP_NAME}`,
    // other metadata
};

const WishlistPage = async () => {

    return (
        <main>
            <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
            <Wishlist />
        </main>
    );
};

export default WishlistPage;
