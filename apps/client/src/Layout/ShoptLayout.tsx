/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Newsletter from "@/components/Common/Newsletter";
import RecentlyViewdItems from "@/components/client/Shop/RecentlyViewed";
import productStore from "@/lib/store/productStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type ShopLayoutProps = PropsWithChildren;
type DisplayStyle = "grid" | "list";



type ShopContextProps = {
    // displayGrid?: boolean;
    // displayList?: boolean;
    // changeDisplayStyle: (style: DisplayStyle) => void;

    // product: any | undefined;
};

const ShopContext = createContext<ShopContextProps>(null);


export function useShopContext() {
    const context = useContext(ShopContext);

    if (!context) throw new Error("ShopContextProvider not in ShopLayout");


    return context;
}


export const ShopContextProvider = observer((props: ShopLayoutProps) => {

    // const [displayStyle, setDisplayStyle] = useState<DisplayStyle>("grid");

    // const displayGrid = displayStyle === "grid";
    // const displayList = displayStyle === "list";

    const product = productStore.productDetails;

    // useEffect(() => {
    //     localStorage.setItem("productDetails", JSON.stringify(product));
    // }, [product]);

    console.dir(product);

    const context: ShopContextProps = {
        // displayGrid,
        // displayList,
        // product: {
        //     ...product,
        //     title: "Prodi!"
        // },
        // changeDisplayStyle: (style) => {
        //     if (style === displayStyle) return;
        //     setDisplayStyle(style);
        // }
    }

    return (
        <ShopContext.Provider value={context}>
            <main>
                {props.children}
            </main>
        </ShopContext.Provider>
    );
})


export function ShopLayout(props:PropsWithChildren) {
    return (
        <>
            
            <Breadcrumb title={"Explore All Products"} pages={["shop"]} />
            <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    {props.children}
                </div>
            </section>
        </>
    );
}
