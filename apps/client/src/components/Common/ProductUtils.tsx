import Link from "next/link";
import { ShopIcon } from "./Icons";
import ProductDisplay from "../client/Shop/ProductItem";
import { PropsWithChildren } from "react";
import { ProductInfo } from "@rcffuta/ict-lib";



export type CategoryHighlightProps<T extends ProductInfo = ProductInfo> = {
    title: string;
    subTitle: string;
    ctaText: string;
    ctaLink: string;
    data: T[];
    maxDisplay?: number;
};


export function CategoryHighlight(props: CategoryHighlightProps) {

    const {title, subTitle, ctaLink, ctaText, data, maxDisplay=12} = props;

    
    return (
        <CategoryHighlightWrapper>
            {/* <!-- section title --> */}
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                        <ShopIcon />
                        {title}
                    </span>
                    <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                        {subTitle}
                    </h2>
                </div>

                <Link
                    href={ctaLink}
                    className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                >
                    {ctaText}
                </Link>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
                {/* <!-- Best Sellers item --> */}
                {data.slice(0, maxDisplay).map((item, key) => (
                    <ProductDisplay item={item} key={key} />
                    // <ProductCardSkeleton key={key} />
                ))}
            </div>

            <div className="text-center mt-12.5">
                <Link
                    href={ctaLink}
                    className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                >
                    {ctaText}
                </Link>
            </div>
        </CategoryHighlightWrapper>
    );
}


export function CategoryHighlightWrapper(props: PropsWithChildren) {
    return (
        <section className="overflow-hidden pt-15">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                {props.children}
            </div>
        </section>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="group animate-pulse">
            {/* Image area */}
            <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-gray-2 min-h-[270px] mb-4">
                {/* fake image */}
            </div>

            {/* Buttons area */}
            <div className="flex items-center justify-center gap-2.5 pb-5">
                <div className="w-9 h-9 rounded-[5px] bg-gray-2"></div>
                <div className="w-24 h-9 rounded-[5px] bg-gray-2"></div>
                <div className="w-9 h-9 rounded-[5px] bg-gray-2"></div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2.5 mb-2">
                <div className="w-20 h-4 bg-gray-2 rounded"></div>
                <div className="w-10 h-4 bg-gray-2 rounded"></div>
            </div>

            {/* Title */}
            <div className="h-5 w-3/4 bg-gray-2 rounded mb-1.5"></div>

            {/* Price */}
            <div className="flex items-center gap-2">
                <div className="w-16 h-5 bg-gray-2 rounded"></div>
                <div className="w-12 h-5 bg-gray-2 rounded"></div>
            </div>
        </div>
    );
}

export function ProductListSkeleton({ length = 12 }: { length?: number }) {
    return (
        <>
            {/* <!-- Products Grid Tab Content Start --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9">
                {Array.from({ length }).map((item, key) => (
                    <ProductCardSkeleton key={key} />
                ))}
            </div>
            {/* <!-- Products Grid Tab Content End --> */}
        </>
    );
}
