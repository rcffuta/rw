"use client";
import SingleItem from "./SingleItem";
import { observer } from "mobx-react-lite";
import { cartStore } from '@/lib/store/cart-utils'
import EmptyCart from "./EmptyCart";


function CartTable () {

    const items = cartStore.items;
    const isEmptyCart = cartStore.isEmptyCart;


    if (isEmptyCart) return <EmptyCart />;


    const handleClearCart = () => {
        // Implement cart clearing logic
        console.debug('Clearing cart...')
    }


    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
                <h2 className="font-medium text-dark text-2xl">Your Shopping Cart</h2>
                <button
                    className="text-blue hover:text-blue-dark transition-colors"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
            </div>

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
                        {items.map((item, key) => (
                            <SingleItem item={item} key={key} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(CartTable);
