"use client";
import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import SingleItem from "./SingleItem";
import Breadcrumb from "../../Common/Breadcrumb";
import cartStore from "@/lib/store/cartStore";
import { observer } from "mobx-react-lite";
import EmptyCart from "./EmptyCart";
import { FullOrder } from "db/actions";
import toast from "react-hot-toast";
import { useProduct } from "@/hooks/useProduct";


const CartTable = ({items}:{items: FullOrder[]}) => {
  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
          <h2 className="font-medium text-dark text-2xl">Your Cart</h2>
          <button className="text-blue" onClick={()=>{
            cartStore.removeAllItemsFromCart();
            toast.success("Updated Cart", {
                id: "updateCartToast",
            });
          }}>
            Clear Shopping Cart
          </button>
        </div>

        {/* Listing area */}

        <div className="bg-white rounded-[10px] shadow-1">
          <div className="w-full overflow-x-auto">
            
            <div className="min-w-[1170px]">
              {/* <!-- table header --> */}
              <div className="flex items-center py-5.5 px-7.5">
                <div className="min-w-[400px]">
                  <p className="text-dark">Product</p>
                </div>

                <div className="min-w-[180px]">
                  <p className="text-dark">Price</p>
                </div>

                <div className="min-w-[275px]">
                  <p className="text-dark">Quantity</p>
                </div>

                <div className="min-w-[200px]">
                  <p className="text-dark">Subtotal</p>
                </div>

                <div className="min-w-[50px]">
                  <p className="text-dark text-right">Action</p>
                </div>
              </div>

              {/* <!-- cart item --> */}
              {items.length > 0 &&
                items.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
          <Discount />
          <OrderSummary />
        </div>
      </div>
    </section>
  )
};

const Cart = observer(() => {
  const cartItems = cartStore.items;

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Cart"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems.length > 0 ? (
        <CartTable items={cartItems}/>
      ) : (
        <EmptyCart/>
      )}
    </>
  );
});

export default Cart;
