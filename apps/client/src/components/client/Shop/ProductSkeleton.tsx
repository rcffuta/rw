export function ProductCardSkeleton() {
    return (
        <div className="group animate-pulse">
            {/* Image area */}
            <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-gray-200 min-h-[270px] mb-4" />

            {/* Buttons area */}
            <div className="flex items-center justify-center gap-2.5 pb-5">
                <div className="w-9 h-9 rounded-[5px] bg-gray-200" />
                <div className="w-24 h-9 rounded-[5px] bg-gray-200" />
                <div className="w-9 h-9 rounded-[5px] bg-gray-200" />
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2.5 mb-2">
                <div className="w-20 h-4 bg-gray-200 rounded" />
                <div className="w-10 h-4 bg-gray-200 rounded" />
            </div>

            {/* Title */}
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-1.5" />

            {/* Price */}
            <div className="flex items-center gap-2">
                <div className="w-16 h-5 bg-gray-200 rounded" />
                <div className="w-12 h-5 bg-gray-200 rounded" />
            </div>
        </div>
    );
}

export function ProductListSkeleton() {

    return (
        <>
            {/* <!-- Products Grid Tab Content Start --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9">
                {Array.from({ length: 10 }).map((item, key) => (
                    <ProductCardSkeleton key={key} />
                ))}
            </div>
            {/* <!-- Products Grid Tab Content End --> */}
        </>
    );
}
