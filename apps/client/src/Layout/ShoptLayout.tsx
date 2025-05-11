/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { PropsWithChildren } from "react";

type ShopLayoutProps = PropsWithChildren;


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
