"use client";

import { FullScreenIcon, MinusIcon, PlusIcon, Star, StockCheck, WishListIcon2 } from "@/components/Common/Icons";
import { usePreviewSlider } from "@/context/PreviewSliderContext";
import { useProductAction } from "@/hooks/useProduct";
import cartStore from "@/lib/store/cartStore";
import wishlistStore from "@/lib/store/wishlistStore";
import { ProductImage } from "@rw/shared";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ProductInfo, MerchPackage, ProductRecord } from "@rcffuta/ict-lib";


// utils.tsx

export function Price({ 
  price, 
  className = "" 
}: { 
  price: number; 
  className?: string 
}) {
  return (
    <div className={`font-bold ${className}`}>
      ${price.toFixed(2)}
    </div>
  );
}

export function Cta({
  product,
  pkg,
  mini = false,
  label,
  disabled = false,
  onClick
}: {
  product?: ProductInfo;
  pkg?: MerchPackage;
  mini?: boolean;
  label?: string;
  disabled?: boolean;
  onClick?:()=>void
}) {
  const buttonText = label || 
    (product ? "Add to Cart" : pkg ? "Add Package to Cart" : "Add to Cart");
  
  return (
      <button
          disabled={disabled}
          className={`${
              mini ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'
          } font-medium bg-blue-dark text-white rounded-md hover:bg-blue-600 transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onClick}
      >
          {buttonText}
      </button>
  )
}

export function Rating({
  rating = 0,
  reviews = 0,
  className = ""
}: {
  rating?: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
      {reviews > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({reviews} review{reviews !== 1 ? "s" : ""})
        </span>
      )}
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function ProductGallery({product}:{product: ProductRecord}) {
    const { openPreviewModal } = usePreviewSlider();
    const [previewImg, setPreviewImg] = useState(0);

    const images = product.variants.map(e=>e.image).flat();

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
                        src={product.variants.at(0).image}
                        alt="products-details"
                        width={400}
                        height={400}
                    />
                </div>
            </div>

            {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                {images.map((item, key) => (
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


