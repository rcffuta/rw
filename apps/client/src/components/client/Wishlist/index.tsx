"use client";
import React from "react";
import SingleItem from "./SingleItem";
import { observer } from "mobx-react-lite";
import wishlistStore from "@/lib/store/wishlistStore";
import EmptyWishList from "./EmptyWishList";
import { FullWishList } from "@gamezone/db";
import { CartIcon2 } from "@/components/Common/Icons";
import Link from "next/link";
import { SHOP } from "@/constants";


function WishListTable({items}:{items: FullWishList[]}) {
  return (
      <>
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
              <button className="text-blue">Clear Wishlist Cart</button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                  <div className="min-w-[1170px]">
                      {/* <!-- table header --> */}
                      <div className="flex items-center py-5.5 px-10">
                          <div className="min-w-[83px]"></div>
                          <div className="min-w-[387px]">
                              <p className="text-dark">Product</p>
                          </div>

                          <div className="min-w-[205px]">
                              <p className="text-dark">Unit Price</p>
                          </div>

                          <div className="min-w-[265px]">
                              <p className="text-dark">Stock Status</p>
                          </div>

                          <div className="min-w-[150px]">
                              <p className="text-dark text-right">Action</p>
                          </div>
                      </div>

                      {/* <!-- wish item --> */}
                      {items.map((item, key) => (
                          <SingleItem item={item} key={key} />
                      ))}
                  </div>
              </div>
          </div>
      </>
  );
}


export const Wishlist = observer(() => {
    const wishlistItems = wishlistStore.items;

    let template: any;

    if (wishlistItems.length < 1) {
        template = (
            <div className="text-center mt-8">
                <div className="mx-auto pb-7.5">
                    <CartIcon2 />
                </div>

                <p className="pb-6 text-xl">Your Wishlist is empty!</p>

                <Link
                    href={SHOP}
                    className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    } else {
        template = <WishListTable items={wishlistItems}/>
    }

    return (
        <>
        
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                {template}
                </div>
            </section>
        </>
    );
});
