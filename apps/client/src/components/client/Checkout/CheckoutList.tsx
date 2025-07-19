"use client";

import { useFormatCurrency } from "@rw/shared";
import { OrderWithProduct } from "@willo/db";


type CheckoutListProps = {
    items: OrderWithProduct[];
    totalPrice: number;
};


export const CheckoutList = ({items, totalPrice}:CheckoutListProps) => {
    const parseFigure = useFormatCurrency();

    return (
        <div className="bg-white shadow-1 rounded-[10px]">
            <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                <h3 className="font-medium text-xl text-dark">Your Order</h3>
            </div>

            <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                {/* <!-- title --> */}
                <div className="flex items-center justify-between py-5 border-b border-gray-3">
                    <div>
                        <h4 className="font-medium text-dark">Product</h4>
                    </div>
                    <div>
                        <h4 className="font-medium text-dark text-right">
                            Subtotal
                        </h4>
                    </div>
                </div>

                {items.map((item, index) => (
                    <OrderListItem item={item} key={index} />
                ))}

                <div className="flex items-center justify-between pt-5">
                    <div>
                        <h4 className="font-medium text-dark">Total</h4>
                    </div>
                    <div>
                        <h4 className="font-medium text-dark text-right">
                            {parseFigure(totalPrice)}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

function OrderListItem({ item }: { item: OrderWithProduct }) {
    const parseFigure = useFormatCurrency();
    return (
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
                <p className="text-dark">{item.product.title}</p>
            </div>
            <div>
                <p className="text-dark text-right">
                    {parseFigure(item.product.price * item.quantity)}
                </p>
            </div>
        </div>
    );
}
