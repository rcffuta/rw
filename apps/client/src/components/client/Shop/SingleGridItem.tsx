"use client";
import React from "react";
import { useModalContext } from "@/context/QuickViewModalContext";
import Link from "next/link";
import { ViewProductIcon, WishListIcon } from "../../Common/Icons";
import { useProductAction } from "@/hooks/useProduct";
import { CustomImage } from "@rw/shared";

const SingleGridItem = ({ item }: { item: any }) => {
  const { openModal } = useModalContext();

  const {
    handleQuickViewUpdate,
    handleAddToCart,
    handleAddItemToWishList
  } = useProductAction(item);

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        <CustomImage src={item.images?.at(0)} alt={item.title} />

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
            <ViewProductIcon/>
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

      {/* <div className="flex items-center gap-2.5 mb-2">
        <StarRating rate={5}/>

        <p className="text-custom-sm">({item.reviews})</p>
      </div> */}

      <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
        <Link href={`/shop/${item.id}`}> {item.title} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.discountedPrice}</span>
        <span className="text-dark-4 line-through">${item.price}</span>
      </span>
    </div>
  );
};

export default SingleGridItem;
