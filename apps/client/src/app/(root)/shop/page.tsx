import React from "react";

import { Metadata } from "next";
import { ShopLayout } from "@/Layout/ShoptLayout";
import ProductDiplayHeader from "@/components/client/Shop/ProductDiplayHeader";
import ProductPagination from "@/components/client/Shop/ProductPagination";
import { getAllProducts } from "@gamezone/db";
import { ProductList } from "@/components/client/Shop/ProductList";

export const metadata: Metadata = {
    title: "Shop | GameZone",
    description: "View products and items on GameZone",
    // other metadata
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
    const products = await getAllProducts();
    return (
        <ShopLayout>
            <div className="w-full">
                {/* <!-- Products Grid Tab Content Start --> */}
                <ProductDiplayHeader total={0} current={products.length} />
                {/* <!-- Products Grid Tab Content End --> */}
                <ProductList products={products}/>
                {/* <!-- Products Pagination Start --> */}
                <ProductPagination />
                {/* <!-- Products Pagination End --> */}
            </div>
        </ShopLayout>
    );
};
