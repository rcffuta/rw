import React from "react";

import { Metadata } from "next";
import ShopDiplayHeader from "@/components/client/Products/ProductDiplayHeader";
import ShopPagination from "@/components/client/Products/ProductPagination";
import ShopItemList from "@/components/client/Shop/ShopItemList";
import { ShopLayout } from "@/Layout/ShoptLayout";
import ProductList from "@/components/client/Products";
import shopData from "@/data/shop";
import { ProductItem } from "@/components/client/Shop/ProductItem";
import ProductDiplayHeader from "@/components/client/Products/ProductDiplayHeader";
import ProductPagination from "@/components/client/Products/ProductPagination";
import { getAllProducts } from "@gamezone/db";

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
                <ProductDiplayHeader
                    total={products.length}
                    current={1}
                />
                {/* <!-- Products Grid Tab Content End --> */}
                <ProductList products={products} />
                {/* <!-- Products Pagination Start --> */}
                <ProductPagination />
                {/* <!-- Products Pagination End --> */}
            </div>
        </ShopLayout>
    );
};
