import shopData from "@/data/shop";
import { useShopContext } from "@/Layout/ShoptLayout";
import clsx from "clsx";
import ProductItem from "./ProductItem";

export default function ProductList({ products }: { products: any[] }) {
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
                    <ProductItem key={key} item={item} />
                ))}
            </div>
            {/* <!-- Products Grid Tab Content End --> */}
        </>
    );
}
