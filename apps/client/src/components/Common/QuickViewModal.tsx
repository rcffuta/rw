"use client";
import React, { useEffect, useState } from "react";

import { useModalContext } from "@/context/QuickViewModalContext";
import { usePreviewSlider } from "@/context/PreviewSliderContext";
import productStore from "@/lib/store/productStore";
import cartStore from "@/lib/store/cartStore";
import { observer } from "mobx-react-lite";
import { useProductAction } from "@/hooks/useProduct";
import { CrossIcon2, FullScreenIcon, MinusIcon, PlusIcon, Star, StockCheck, WishListIcon2 } from "./Icons";
import { FullProduct, Review } from "@gamezone/db";
import { ProductImage } from "./CustomImage";
import wishlistStore from "@/lib/store/wishlistStore";


function Price({product}:{product: FullProduct}) {
    return (
        <div>
            <h4 className="font-semibold text-lg text-dark mb-3.5">Price</h4>

            {product.discountedPrice > 0 ? (
                <span className="flex items-center gap-2">
                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                        ${product.discountedPrice}
                    </span>
                    <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                        ${product.price}
                    </span>
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                        ${product.price}
                    </span>
                </span>
            )}
        </div>
    );
}

function Rating({reviews}:{reviews: Review[]}) {
    if (reviews.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-5 mb-6">
            <div className="flex items-center gap-1.5">
                {/* <!-- stars --> */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((e, i) => {
                        return <Star filled={i < reviews.length - 1} />;
                    })}
                </div>

                <span>
                    <span className="font-medium text-dark">
                        {" "}
                        {reviews.length} Rating{" "}
                    </span>
                    <span className="text-dark-2">
                        {" "}
                        ({reviews.length} reviews){" "}
                    </span>
                </span>
            </div>

            <div className="flex items-center gap-2">
                <StockCheck />

                <span className="font-medium text-dark"> In Stock </span>
            </div>
        </div>
    );
}


const Cta = observer(({product}:{product: FullProduct}) => {
    const quantity = cartStore.getItemQuantity(product.id);
    const isInWishList = wishlistStore.isItemInWishlist(product.id);

    const {
        handleupdateQuantity,
        handleAddToCart,
        handleAddItemToWishList,
        handleRemoveFromWishlist,
    } = useProductAction(product);
    return (
        <>
            <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                <Price product={product} />

                <div>
                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                        Quantity
                    </h4>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() =>
                                quantity > 0 &&
                                handleupdateQuantity(quantity - 1)
                            }
                            aria-label="button for remove product"
                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                            disabled={quantity < 1}
                        >
                            <MinusIcon />
                        </button>

                        <span
                            className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark"
                            x-text="quantity"
                        >
                            {quantity}
                        </span>

                        <button
                            onClick={() => handleupdateQuantity(quantity + 1)}
                            aria-label="button for add product"
                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                            disabled={quantity < 1}
                        >
                            <PlusIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    disabled={quantity > 0}
                    onClick={() => {
                        handleAddToCart();
                        // closeModal();
                    }}
                    className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark`}
                >
                    Add to Cart
                </button>

                <button
                    className={`inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95 `}
                    onClick={() =>
                        isInWishList
                            ? handleRemoveFromWishlist()
                            : handleAddItemToWishList()
                    }
                >
                    {isInWishList ? (
                        <>
                            {/* <WishListIcon2 /> */}
                            Remove from Wishlist
                        </>
                    ) : (
                        <>
                            <WishListIcon2 />
                            Add to Wishlist
                        </>
                    )}
                </button>
            </div>
        </>
    );
})

const QuickViewModal = observer(() => {
    const { isModalOpen, closeModal } = useModalContext();
    const { openPreviewModal } = usePreviewSlider();
    
    const [activePreview, setActivePreview] = useState(0);

    
    // get the product data
    const product = productStore.quickView;
    const { discountPercent } =
        useProductAction(product);


    // preview modal
    const handlePreviewSlider = () => {
        // dispatch(updateproductDetails(product));

        productStore.updateProductDetails(product);

        openPreviewModal();
    };


    useEffect(() => {
        // closing modal while clicking outside
        function handleClickOutside(event) {
        if (!event.target.closest(".modal-content")) {
            closeModal();
        }
        }

        if (isModalOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);

        // setQuantity(1);
        };
    }, [isModalOpen, closeModal]);

    if (!product) return null;

    return (
        <div
            className={`${
                isModalOpen ? "z-99999" : "hidden"
            } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
        >
            <div className="flex items-center justify-center ">
                <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
                    <button
                        onClick={() => closeModal()}
                        aria-label="button for close modal"
                        className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
                    >
                        <CrossIcon2 />
                    </button>

                    <div className="flex flex-wrap items-center gap-12.5">
                        <div className="max-w-[526px] w-full">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-5">
                                    {product.images.map((img, key) => (
                                        <button
                                            onClick={() =>
                                                setActivePreview(key)
                                            }
                                            key={key}
                                            className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-blue ${
                                                activePreview === key &&
                                                "border-2 border-blue"
                                            }`}
                                        >
                                            <ProductImage
                                                src={img}
                                                alt="thumbnail"
                                                width={61}
                                                height={61}
                                                className="aspect-square"
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                                    <div>
                                        <button
                                            onClick={handlePreviewSlider}
                                            aria-label="button for zoom"
                                            className="gallery__Image w-10 h-10 rounded-[5px] bg-white shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-8 right-4 lg:right-8 z-50"
                                        >
                                            <FullScreenIcon />
                                        </button>

                                        <ProductImage
                                            src={product?.images?.at(0)}
                                            alt="products-details"
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[445px] w-full">
                            {discountPercent <= 0 ? null : (
                                <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green mb-6.5">
                                    SALE {discountPercent}% OFF
                                </span>
                            )}

                            <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                                {product.title}
                            </h3>

                            <Rating reviews={product.reviews} />

                            <p>{product.description}</p>

                            <Cta product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default QuickViewModal;
