

import React from 'react'

import Breadcrumb from '../../Common/Breadcrumb'

import CartTable from './CartTable'
import OrderAction from './OrderAction'

const Cart = () => {

    return (
        <>
            {/* Breadcrumb Section */}
            <Breadcrumb title="Cart" pages={[]} />

            {/* Main Cart Section */}
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    {/* Cart Header */}

                    <CartTable />
                    
                    <OrderAction/>
                </div>
            </section>
        </>
    )
}

export default Cart;
