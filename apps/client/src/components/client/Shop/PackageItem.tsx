"use client";
import React from "react";
import { useModalContext } from "@/context/QuickViewModalContext";
import Link from "next/link";
import { StarRating, ViewProductIcon, WishListIcon } from "../../Common/Icons";
import { formatNaira, ProductImage } from "@rw/shared";
import { MerchPackageRecord } from "@rcffuta/ict-lib";

export default function PackageDisplayItem({ item }: { item: MerchPackageRecord }) {
    const { openModal } = useModalContext();

    // const { priceText, isDiscount } = useProduct(item);

    // const { handleQuickViewUpdate, handleAddToCart, handleAddItemToWishList } =
    //     useProductAction(item);

    const isDiscount = false;
    const priceText = formatNaira(item.totalPrice)


    return (
        <div className="group product-display">
            <div className="product-thumbmail relative overflow-hidden flex items-center justify-center rounded-lg min-h-[270px] mb-4">
                <ProductImage
                    src={item.image}
                    alt={item.name + " " + "Photo"}
                />

                <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                    <button
                        onClick={() => {
                        }}
                        id="newOne"
                        aria-label="button for quick view"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                    >
                        <ViewProductIcon />
                    </button>

                    <button
                        onClick={() => {}}
                        className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
                    >
                        Add to cart
                    </button>

                    <button
                        onClick={() => {}}
                        aria-label="button for favorite select"
                        id="favOne"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                    >
                        <WishListIcon />
                    </button>
                </div>
            </div>

            {/* {(item.reviews || [])?.length === 0 ? null : (
                <div className="flex items-center gap-2.5 mb-2">
                    <StarRating rate={item.reviews.length} />

                    <p className="text-custom-sm">({item.reviews.length})</p>
                </div>
            )} */}

            <Link
                href={`/shop/${item.id}`}
                className="block text-dark font-medium text-center ease-out duration-200 hover:text-blue mb-1.5"
            >
                <h3>{item.name}</h3>

                {isDiscount ? (
                    <span className="text-2xl">
                        {/* <b>{discountedPriceText}</b>{" "} */}
                        <small className="text-dark-4 line-through">
                            {priceText}
                        </small>
                    </span>
                ) : (
                    <span className="text-dark gap-2 font-medium  text-2xl">
                        {priceText}
                    </span>
                )}
            </Link>
        </div>
    );
};
