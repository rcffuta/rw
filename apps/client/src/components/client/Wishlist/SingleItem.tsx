import React from "react";

import { CrossIcon3, StockCheck } from "@/components/Common/Icons";
import wishlistStore from "@/lib/store/wishlistStore";
import { ProductImage, useFormatCurrency } from "@rw/shared";
import { cartStore } from '@/lib/store/cart-utils'

const SingleItem = ({ item }: {item: any}) => {
  // const { handleAddToCart, handleRemoveFromWishlist } = useProductAction(item.product);

  const parseFigure = useFormatCurrency();

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={() => wishlistStore.removeItem(item.productId)}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
        >
          <CrossIcon3/>
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <ProductImage src={item.product?.images?.at(0)} alt="product" width={200} height={200} />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-blue">
                <a href="#"> {item.product.title} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="text-dark">{parseFigure(item.product.price)}</p>
      </div>

      <div className="min-w-[265px]">
        <div className="flex items-center gap-1.5">
          <StockCheck/>

          <span className="text-green"> Available </span>
        </div>
      </div>

      <div className="min-w-[150px] flex justify-end">
        <button
          // onClick={() => cartStore.addItemToCart(item.product)}
          className="inline-flex text-dark hover:text-white bg-gray-1 border border-gray-3 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue hover:border-gray-3"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
