"use client";

import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/Common/Icons";
import { formatNaira, ProductImage, useNavigate } from "@rw/shared";
import Link from "next/link";
import { SHOP } from "@/constants";
import { observer } from "mobx-react-lite";
import { OrderItem } from "@rcffuta/ict-lib";
import cartStore from "@/lib/store/cartStore";
import { PencilIcon } from "lucide-react";


const SingleItem = observer(
    ({ item }: { item: OrderItem }) => {

        // const {product, quantity} = item;
        // const [quantity, setQuantity] = useState(quantity);

        // const { priceText, getOrderItemPrice } = useProduct(product);

        // const { updateCartQuantity, deleteFromCart } = useCartAction(product);

        // const orderPrice = getOrderItemPrice(quantity);

        const {navigate} = useNavigate();

        return (
            <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
                <div className="min-w-[400px]">
                    <div className="flex items-center justify-between gap-5">
                        <div className="w-full flex items-center gap-5.5 my-5">
                            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                                <ProductImage
                                    width={100}
                                    height={100}
                                    src={item.variant.image}
                                    alt={item.name}
                                />
                            </div>

                            <div>
                                <h3 className="text-dark ease-out duration-200 hover:text-blue">
                                    <Link href={`${SHOP}/${item.itemId}`}>
                                        {" "}
                                        {item.name}{" "}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-w-[180px]">
                    <p className="text-dark">{formatNaira(item.price)}</p>
                </div>

                <div className="min-w-[275px]">
                    <div className="w-max flex items-center rounded-md border border-gray-3">
                        {/* <button
                            // onClick={() => cartStore.updateQuantity(item.quantity - 1, {}, )}
                            aria-label="button for remove product"
                            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
                        >
                            <MinusIcon />
                        </button> */}

                        <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
                            {item.quantity}
                        </span>

                        {/* <button
                            // onClick={() => updateCartQuantity(quantity + 1)}
                            aria-label="button for add product"
                            className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
                        >
                            <PlusIcon />
                        </button> */}
                    </div>
                </div>

                <div className="min-w-[200px]">
                    <p className="text-dark">{formatNaira(item.price * item.quantity)}</p>
                </div>

                <div className="min-w-[50px] flex justify-between gap-1">
                    <button
                        onClick={()=>{
                            navigate(`${SHOP}/${item.itemId}`)
                        }}
                        aria-label="button for remove product from cart"
                        className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-blue-light"
                    >
                        <PencilIcon />
                    </button>
                    <button
                        onClick={()=>cartStore.deleteFromCart(item.itemId)}
                        aria-label="button for remove product from cart"
                        className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
        );
    }
);

export default SingleItem;
