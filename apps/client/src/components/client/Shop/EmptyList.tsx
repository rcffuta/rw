import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/context/CartSidebarModalContext";
import { CartIcon } from "@/components/Common/Icons";

const EmptyList = () => {

  return (
      <div className="text-center max-w-md mx-auto">
          <div className=" pb-7.5">
              <CartIcon />
          </div>

          <p className="pb-6">No product to show!</p>
      </div>
  );
};

export default EmptyList;
