import React from "react";
import {
    CategoryHighlight, CategoryHighlightProps
} from "@/components/Common/ProductUtils";
import ToastFeedback from "@/components/Common/ToastFeedback";
import { getProducts, ProductRecord } from "@rcffuta/ict-lib";
import ProductDisplayItem from "./ProductItem";


type Props = Pick<CategoryHighlightProps, "maxDisplay">

export async function ProductList(props: Props) {
    let data: ProductRecord[];

    try {

        const {
            message,
            success,
            data: products
        } = await getProducts();

        if (!success) {
            throw new Error(message)
        }

        data = products
    } catch(err: any) {
        console.error(err);
        return <ToastFeedback message={"Error loading Merch!"} id="prodHighlightToast" type="error"/>
    }

    if (data.length < 1) return null;

    return (
        <CategoryHighlight
            {...props}
            ctaLink={"#"}
            ctaText="View More"
            data={data}
            subTitle="Books available for you"
            title="Books"
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
