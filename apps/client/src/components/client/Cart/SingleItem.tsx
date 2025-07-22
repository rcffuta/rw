'use client'

import React from 'react'
import { TrashIcon } from '@/components/Common/Icons'
import { formatNaira, ProductImage, useNavigate } from '@rw/shared'
import Link from 'next/link'
import { SHOP } from '@/constants'
import { observer } from 'mobx-react-lite'
import { OrderItem } from '@rcffuta/ict-lib'
import { cartStore } from '@/lib/store/cart-utils'
import { PencilIcon } from 'lucide-react'
interface SingleItemProps {
    item: OrderItem;
}

const SingleItem = observer(({ item }: SingleItemProps) => {
    const { navigate } = useNavigate()

    if (!item) return null

    // Derived values
    const totalPrice = item.price * item.quantity
    const productLink = `${SHOP}/${item.itemId}`

    // Handlers
    const handleEdit = () => navigate(productLink)
    const handleDelete = () => cartStore.deleteFromCart(item.itemId)

    

    return (
        <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
            {/* Product Info */}
            <div className="min-w-[400px]">
                <div className="flex items-center gap-5.5 my-5">
                    <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                        <ProductImage
                            width={100}
                            height={100}
                            src={item.variant.image}
                            alt={item.name}
                        />
                    </div>

                    <div>
                        <h3 className="text-dark hover:text-blue transition-colors">
                            <Link href={productLink}>{item.name}</Link>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Unit Price */}
            <div className="min-w-[180px]">
                <p className="text-dark">{formatNaira(item.price)}</p>
            </div>

            {/* Quantity */}
            <div className="min-w-[275px]">
                <div className="w-max flex items-center rounded-md border border-gray-3">
                    <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
                        {item.quantity}
                    </span>
                </div>
            </div>

            {/* Total Price */}
            <div className="min-w-[200px]">
                <p className="text-dark">{formatNaira(totalPrice)}</p>
            </div>

            {/* Actions */}
            <div className="min-w-[50px] flex gap-1">
                <button
                    onClick={handleEdit}
                    aria-label="Edit product"
                    className="flex items-center justify-center rounded-lg w-9.5 h-9.5 text-dark hover:bg-red-light-6 hover:border-red-light-4 hover:text-blue-light transition-colors"
                >
                    <PencilIcon />
                </button>
                <button
                    onClick={handleDelete}
                    aria-label="Remove product from cart"
                    className="flex items-center justify-center rounded-lg w-9.5 h-9.5 text-dark hover:bg-red-light-6 hover:border-red-light-4 hover:text-red transition-colors"
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    )
})

export default SingleItem