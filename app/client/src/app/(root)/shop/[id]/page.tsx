import React from "react";

import { Metadata } from "next";
import { ShopDetailLayout } from "@/Layout/ShoptLayout";
import ShopProduct from "@/components/client/Shop/ShopProduct";

export const metadata: Metadata = {
    title: "Product | GameZone",
    description: "View Product from GameZone",
    // other metadata
};

export default function ShopPage() {
    return (
        <ShopDetailLayout>
            <ShopProduct/>
        </ShopDetailLayout>
    );
};
