import React from "react";
import {
    CategoryHighlight,
    CategoryHighlightProps,
    ProductHighlight,
} from '@/components/Common/ProductUtils'
import ToastFeedback from "@/components/Common/ToastFeedback";
import { getProducts, MerchPackageRecord, ProductRecord } from "@rcffuta/ict-lib";
import ProductDisplayItem from "./ProductItem";
import { loadPackages, loadProducts } from "@/actions/product.action";


type Props = Pick<CategoryHighlightProps, "maxDisplay">

export async function ProductList(props: Props) {
    let data: ProductRecord[] = await loadProducts()

    if (data.length < 1) return null;

    return (
        <ProductHighlight
            {...props}
            ctaLink={''}
            ctaText="" //"View More"
            data={data}
            subTitle="Merch available for you"
            title="Products"
        />
    )
};

export async function PackageList(props: Props) {
    let data: MerchPackageRecord[] = await loadPackages()

    if (data.length < 1) return null;

    return (
        <CategoryHighlight
            {...props}
            ctaLink={""}
            ctaText="" //"View More"
            data={data}
            subTitle="Merch available for you"
            title="Products"
        />
    );
};


export function ShopProductList({ products }: { products: ProductRecord[] }) {
    // const { displayGrid, displayList } = useShopContext();
    return (
        <>
            {/* <!-- Products Grid Tab Content Start --> */}
            <div
                // className={clsx(
                //     {
                //         "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9":
                //             displayGrid,
                //     },
                //     {
                //         "flex flex-col gap-7.5": displayList,
                //     }
                // )}

                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9"
            >
                {products.map((item, key) => (
                    <ProductDisplayItem key={key} item={item} />
                ))}
            </div>
            {/* <!-- Products Grid Tab Content End --> */}
        </>
    )
}
