import React from "react";

import { Metadata } from "next";
import { ShopLayout } from "@/Layout/ShoptLayout";
import ProductDiplayHeader from "@/components/client/Shop/ProductDiplayHeader";
import ProductPagination from "@/components/client/Shop/ProductPagination";
import { ProductList } from "@/components/client/Shop/ProductList";
import { getAllProductList } from "@/actions/product.action";
import { ProductItem } from "@gamezone/db";
import ToastFeedback from "@/components/Common/ToastFeedback";
import { APP_NAME } from "@gamezone/lib";

export const metadata: Metadata = {
    title: `Shop | ${APP_NAME}`,
    description: `View products and items on ${APP_NAME}`,
    // other metadata
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
    let products: ProductItem[] = [];
    let error:Error | null = null;

    try {
        products = await getAllProductList();
    } catch (err) {
        error = err as Error;
    }

    return (
        <ShopLayout>
            {!Boolean(error) ? null :(
                <ToastFeedback
                    message={error.message || "Error!"}
                    duration={2000}
                    id="shopToast"
                    type="error"
                />
            )}
            <div className="w-full">
                {/* <!-- Products Grid Tab Content Start --> */}
                <ProductDiplayHeader total={products.length} current={1} />
                {/* <!-- Products Grid Tab Content End --> */}
                <ProductList products={products} />
                {/* <!-- Products Pagination Start --> */}
                <ProductPagination />
                {/* <!-- Products Pagination End --> */}
            </div>
        </ShopLayout>
    );
};
