import Link from "next/link";
import { ShopIcon } from "./Icons";
import { PropsWithChildren } from "react";
import { MerchPackageRecord, ProductInfo, ProductRecord } from "@rcffuta/ict-lib";
import PackageDisplayItem from "../client/Shop/PackageItem";
import { ProductCard, ProductDisplay } from "../client/Shop/ShopUtil";



export type ProductHighlightProps<T extends ProductRecord = ProductRecord> = {
    title?: string;
    subTitle?: string;
    ctaText?: string;
    ctaLink?: string;
    data: T[];
    maxDisplay?: number;
};

export type CategoryHighlightProps<T extends MerchPackageRecord = MerchPackageRecord> = {
    title?: string
    subTitle?: string
    ctaText?: string
    ctaLink?: string
    data: T[]
    maxDisplay?: number
}


export function ProductHighlight(props: ProductHighlightProps) {
    const { title, subTitle, ctaLink, ctaText, data, maxDisplay = 12 } = props

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

                {ctaLink && (
                    <Link
                        href={ctaLink}
                        className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9">
                {/* <!-- Best Sellers item --> */}
                {data.slice(0, maxDisplay).map((item, key) => (
                    <ProductCard item={item} key={key} />
                    // <ProductCardSkeleton key={key} />
                ))}
            </div>

            {ctaLink && (
                <div className="text-center mt-12.5">
                    <Link
                        href={ctaLink}
                        className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        {ctaText}
                    </Link>
                </div>
            )}
        </CategoryHighlightWrapper>
    )
}


export function ProductListItems(props: ProductHighlightProps) {
    const { data } = props

    return (
        <CategoryHighlightWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9">
                {data.map((item, key) => (
                    <ProductCard item={item} key={key} />
                ))}
            </div>
        </CategoryHighlightWrapper>
    )
}


export function CategoryHighlight(props: CategoryHighlightProps) {
    const { title, subTitle, ctaLink, ctaText, data, maxDisplay = 12 } = props

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

                {ctaLink && (
                    <Link
                        href={ctaLink}
                        className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
                {/* <!-- Best Sellers item --> */}
                {data.map((item, key) => (
                    <ProductCard item={item} key={key} />
                    // <ProductCardSkeleton key={key} />
                ))}
            </div>

            {ctaLink && (
                <div className="text-center mt-12.5">
                    <Link
                        href={ctaLink}
                        className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
                    >
                        {ctaText}
                    </Link>
                </div>
            )}
        </CategoryHighlightWrapper>
    )
}


export function CategoryListItems(props: CategoryHighlightProps) {
    const { data } = props

    return (
        <CategoryHighlightWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-7.5 gap-y-9">
                {data.map((item, key) => (
                    <ProductCard item={item} key={key} />
                ))}
            </div>
        </CategoryHighlightWrapper>
    )
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
        <div className="container py-8">
            <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-5"></div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-5 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-5 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-5 rounded w-1/3 mt-2"></div>
                </div>
            </div>
        </div>
    )
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
