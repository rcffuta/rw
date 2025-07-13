import React from "react";

import { Metadata } from "next";
import { ShopLayout } from "@/Layout/ShoptLayout";
import ProductDiplayHeader from "@/components/client/Shop/ProductDiplayHeader";
import { ProductList } from "@/components/client/Shop/ProductList";
import { getFilteredProducts, ProductItem } from "@willo/db";
import ToastFeedback from "@/components/Common/ToastFeedback";
import { APP_NAME } from "@willo/lib";
import EmptyList from "@/components/client/Shop/EmptyList";

export const metadata: Metadata = {
    title: `Shop | ${APP_NAME}`,
    description: `View products and items on ${APP_NAME}`,
    // other metadata
};

type ProductsPageProps = {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: ProductsPageProps) {

    const params = await searchParams;

    const categoryId = params.category ? Number(params.category) : undefined;
    const search = params.search;

    let products: ProductItem[] = [];
    let error: Error | null = null;



    try {
        products = await getFilteredProducts({search, categoryId});
    } catch (err) {
        error = err as Error;

    }

    const template =
        products.length < 1 ? (
            <EmptyList />
        ) : (
            <ProductList products={products} />
        );


    return (
        <ShopLayout>
            {!error ? null : (
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
                {template}
                {/* <!-- Products Pagination Start --> */}
                {/* <ProductPagination /> */}
                {/* <!-- Products Pagination End --> */}
            </div>
        </ShopLayout>
    );
};
