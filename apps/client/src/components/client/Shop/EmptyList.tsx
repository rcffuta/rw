import React from "react";
import Link from "next/link";
import { useCartModalContext } from "@/context/CartSidebarModalContext";
import { CartIcon, CartIcon2 } from "@/components/Common/Icons";

const EmptyList = ({title}:{title:string}) => {

  return (
      <div className="text-center max-w-md mx-auto">
          <div className=" pb-7.5">
              <CartIcon2 />
          </div>

          <p className="pb-6">{title || "No product to show!"}</p>
      </div>
  );
};

export default EmptyList;
