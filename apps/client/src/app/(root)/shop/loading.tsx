import { ProductListSkeleton } from "@/components/client/Shop/ProductSkeleton";

export default function ShopPreloader() {
    return (
        <section className="overflow-hidden pt-15">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <ProductListSkeleton/>
            </div>
        </section>
    )
}