import React from "react";
import { Wishlist } from "@/components/client/Wishlist";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
    title: "Your Wishlist | GameZone",
    description: "Check your wishlist on GameZone",
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
