import React from "react";
import { Metadata } from "next";
import ShopProduct from "@/components/client/Shop/ShopProduct";
import { getProductById } from "@gamezone/db";
import Breadcrumb from "@/components/Common/Breadcrumb";
import RecentlyViewdItems from "@/components/client/Shop/RecentlyViewed";
import Newsletter from "@/components/Common/Newsletter";

export const metadata: Metadata = {
    title: "Product | GameZone",
    description: "View Product from GameZone",
};

// type Props = {
//     params: {
//         id: string;
//     };
// };

type Props = { params: Promise<{ id: string }> };

export default async function ShopPage({ params }: Props) {
    const productId = Number((await params).id);

    let template: any;

    if (isNaN(productId)) {
        template = (
            
            <p className="text-red-500 text-center mt-10">
                Invalid product ID
            </p>
        );
    }

    const product = await getProductById(productId);

    if (!product) {
        template = (
            <p className="text-gray-500 text-center mt-10">
                Product not found
            </p>
        );
    } else {
        template = <ShopProduct product={product} />;
    }
    

    return (
        <>
            <Breadcrumb title={"Shop Details"} pages={["shop details"]} />
            {template}
            <RecentlyViewdItems />
            <Newsletter />
        </>
    );
}
