"use client";
import React from "react";
import { useModalContext } from "@/context/QuickViewModalContext";
import Link from "next/link";
import { StarRating, ViewProductIcon, WishListIcon } from "../../Common/Icons";
import { ProductItem } from "@gamezone/db";
import { ProductImage, useFormatCurrency } from "@gamezone/lib";
import { useProduct, useProductAction } from "@/hooks/useProduct";

export default function ProductDisplayItem({ item }: { item: ProductItem }) {
    const { openModal } = useModalContext();

    const { priceText, discountedPriceText, isDiscount } = useProduct(item);

    const { handleQuickViewUpdate, handleAddToCart, handleAddItemToWishList } =
        useProductAction(item);

    return (
        <div className="group">
            <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
                <ProductImage
                    src={item.images.at(0)}
                    alt={item.title + " " + "Photo"}
                />

                <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                    <button
                        onClick={() => {
                            openModal();
                            handleQuickViewUpdate();
                        }}
                        id="newOne"
                        aria-label="button for quick view"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                    >
                        <ViewProductIcon />
                    </button>

                    <button
                        onClick={() => handleAddToCart()}
                        className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
                    >
                        Add to cart
                    </button>

                    <button
                        onClick={() => handleAddItemToWishList()}
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

            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
                <Link href={`/shop/${item.id}`}> {item.title} </Link>
            </h3>

            {isDiscount ? (
                <span className="flex items-center gap-2 font-medium text-lg">
                    <span className="text-dark">{discountedPriceText}</span>
                    <span className="text-dark-4 line-through">
                        {priceText}
                    </span>
                </span>
            ) : (
                <span className="flex items-center gap-2 font-medium text-lg">
                    <span className="text-dark">{priceText}</span>
                </span>
            )}
        </div>
    );
};
