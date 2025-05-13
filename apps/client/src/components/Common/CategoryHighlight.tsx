import Link from "next/link";
import { ShopIcon } from "./Icons";
import { FullBookProduct, FullGameProduct, FullProduct } from "@gamezone/db"
import ProductItem from "../client/Shop/ProductItem";


type CategoryHighlightProps = {
    title: string;
    subTitle: string;
    ctaText: string;
    ctaLink: string;
    data: FullProduct[] | FullBookProduct[] | FullGameProduct[];
};


export default function CategoryHighlight(props: CategoryHighlightProps) {

    const {title, subTitle, ctaLink, ctaText, data} = props;

    
    return (
        <section className="overflow-hidden pt-15">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
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
                    {data.map((item, key) => (
                        <ProductItem item={item} key={key} />
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
            </div>
        </section>
    );
}
