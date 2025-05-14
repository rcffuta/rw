"use client";

import { FullScreenIcon, MinusIcon, PlusIcon, Star, StockCheck, WishListIcon2 } from "@/components/Common/Icons";
import { usePreviewSlider } from "@/context/PreviewSliderContext";
import { useProductAction } from "@/hooks/useProduct";
import cartStore from "@/lib/store/cartStore";
import wishlistStore from "@/lib/store/wishlistStore";
import { ProductItem } from "@gamezone/db";
import { ProductImage } from "@gamezone/lib";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";


export const Cta = observer(({ product, mini }: { product: ProductItem, mini?:boolean}) => {
    const quantity = cartStore.getItemQuantity(product.id);
    const isInWishList = wishlistStore.isItemInWishlist(product.id);

    const {
        handleupdateQuantity,
        handleAddToCart,
        handleAddItemToWishList,
        handleRemoveFromWishlist,
    } = useProductAction(product);


    return (
        <div className="flex flex-wrap items-center gap-4.5">
            <div className="flex items-center rounded-md border border-gray-3">
                <button
                    aria-label="button for remove product"
                    className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                    onClick={() =>
                        quantity > 0 && handleupdateQuantity(quantity - 1)
                    }
                    disabled={quantity < 1}
                >
                    <MinusIcon />
                </button>

                <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
                    {quantity}
                </span>

                <button
                    onClick={() => handleupdateQuantity(quantity + 1)}
                    aria-label="button for add product"
                    className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                    disabled={quantity < 1}
                >
                    <PlusIcon />
                </button>
            </div>

            <button
                    disabled={quantity > 0}
                    onClick={() => {
                        handleAddToCart();
                        // closeModal();
                    }}
                className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
                Add to Cart
            </button>

            <button
                className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
                onClick={() =>
                    isInWishList
                        ? handleRemoveFromWishlist()
                        : handleAddItemToWishList()
                }
            >
                <WishListIcon2 />
            </button>
        </div>
    );

    // return (
    //     <>
    //         <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
    //             <Price product={product} />

    //             <div>
    //                 <h4 className="font-semibold text-lg text-dark mb-3.5">
    //                     Quantity
    //                 </h4>

    //                 <div className="flex items-center gap-3">
    //                     <button
    //                         onClick={() =>
    //                             quantity > 0 &&
    //                             handleupdateQuantity(quantity - 1)
    //                         }
    //                         aria-label="button for remove product"
    //                         className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
    //                         disabled={quantity < 1}
    //                     >
    //                         <MinusIcon />
    //                     </button>

    //                     <span
    //                         className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark"
    //                         x-text="quantity"
    //                     >
    //                         {quantity}
    //                     </span>

    //                     <button
    //                         onClick={() => handleupdateQuantity(quantity + 1)}
    //                         aria-label="button for add product"
    //                         className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
    //                         disabled={quantity < 1}
    //                     >
    //                         <PlusIcon />
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="flex flex-wrap items-center gap-4">
    //             <button
    //                 disabled={quantity > 0}
    //                 onClick={() => {
    //                     handleAddToCart();
    //                     // closeModal();
    //                 }}
    //                 className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark`}
    //             >
    //                 Add to Cart
    //             </button>

    //             <button
    //                 className={`inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95 `}
    //                 onClick={() =>
    //                     isInWishList
    //                         ? handleRemoveFromWishlist()
    //                         : handleAddItemToWishList()
    //                 }
    //             >
    //                 {isInWishList ? (
    //                     <>
    //                         {/* <WishListIcon2 /> */}
    //                         Remove from Wishlist
    //                     </>
    //                 ) : (
    //                     <>
    //                         <WishListIcon2 />
    //                         Add to Wishlist
    //                     </>
    //                 )}
    //             </button>
    //         </div>
    //     </>
    // );
});

export function Price({product}:{product: ProductItem}) {
    return (
        <div>
            {/* <h4 className="font-semibold text-lg text-dark mb-3.5">Price</h4> */}

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

export function Rating({ className}:{className?:string}) {
    const reviews:any[] = [];
    if (reviews.length === 0) return null;

    return (
        // <div className="flex flex-wrap items-center gap-5 mb-6">
        <div className={clsx("flex flex-wrap items-center gap-5", className)}>
            {/* <div className="flex items-center gap-1.5"> */}
            <div className="flex items-center gap-2.5">
                {/* <!-- stars --> */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((e, i) => {
                        return <Star filled={i < reviews.length - 1} />;
                    })}
                </div>

                <span>
                    (`${reviews.length} customer review${reviews.length > 1 ? 's':''}`)
                    {/* <span className="font-medium text-dark">
                        {" "}
                        {reviews.length} Rating{" "}
                    </span>
                    <span className="text-dark-2">
                        {" "}
                        ({reviews.length} reviews){" "}
                    </span> */}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <StockCheck />

                <span className="font-medium text-dark"> In Stock </span>
            </div>
        </div>
    );
}


export function ProductGallery({product}:{product: ProductItem}) {
    const { openPreviewModal } = usePreviewSlider();
    const [previewImg, setPreviewImg] = useState(0);

    return (
        <div className="lg:max-w-[570px] w-full">
            <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                <div>
                    <button
                        onClick={openPreviewModal}
                        aria-label="button for zoom"
                        className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                    >
                        <FullScreenIcon />
                    </button>

                    <ProductImage
                        src={product.images.at(0)}
                        alt="products-details"
                        width={400}
                        height={400}
                    />
                </div>
            </div>

            {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                {product.images.map((item, key) => (
                    <button
                        onClick={() => setPreviewImg(key)}
                        key={key}
                        className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                            key === previewImg
                                ? "border-blue"
                                : "border-transparent"
                        }`}
                    >
                        <ProductImage
                            width={50}
                            height={50}
                            src={item}
                            alt="thumbnail"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}