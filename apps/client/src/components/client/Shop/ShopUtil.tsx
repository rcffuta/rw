'use client'

import { useState } from 'react'
import { formatNaira, normalizeQuantity, ProductImage, useNavigate } from '@rw/shared'
import { MerchPackageRecord, Order, OrderItem, ProductRecord, ProductVariant } from '@rcffuta/ict-lib'
import { Cta, Price, Rating } from './utils'
import Link from 'next/link'
import { FileSearch } from 'lucide-react'
import { SacredQuantityInput } from './quantity'
import VariantSelector from '@/components/ui/VariantSelector'
import SizeSelector from '@/components/ui/SizeSelector'
import { PackageDisplayItem } from '@/components/ui/DisplayItem'
import { observer } from 'mobx-react-lite'
import { OrderType } from '@/lib/store/cartStore'
import { CART } from '@/constants'
import { cartStore } from '@/lib/store/cart-utils'

export const  ProductDisplay = observer(({ product }: { product: ProductRecord }) => {


    // const [selectedSize, setSelectedSize] = useState<string>(product.variants[0].sizes[0])

    const {navigate} = useNavigate();

    const itemType: OrderType = "product";


    let orderItemInfo = cartStore.getOrderItemById(product.id)

    if (!orderItemInfo) {

        orderItemInfo = cartStore.createOrderItem(product, itemType)
    }



    const selectedVariant = orderItemInfo.variant;
    const quantity = orderItemInfo.quantity;
    const selectedSize = orderItemInfo.variant.size || "";
    
  


    function setQuantity(q?:number){

        cartStore.updateQuantity(normalizeQuantity(q, quantity), product, itemType)
    }

    function updateVariant(variant: Partial<OrderItem["variant"]>){

        cartStore.updateVariant(variant, product, itemType)
    }

    function saveOrder() {
        const done = cartStore.addToCart(product, itemType);

        if (done) {
            navigate(CART)
        }
    }
    


    const sizes = product.variants.find(e=>e.color === selectedVariant.color)?.sizes || [];

    return (
        <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                    {/* Product Gallery */}
                    <VariantSelector
                        name={product.name}
                        onChangeVariant={updateVariant}
                        selectedVariant={selectedVariant}
                        variants={product.variants}
                    />

                    {/* Product Info */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="font-semibold text-2xl xl:text-3xl text-dark mb-3">
                            {product.name}
                        </h2>

                        <Rating className="mb-4" rating={5} />

                        <Price price={product.price} className="mb-6 text-2xl" />

                        {product.description && (
                            <div
                                className="prose mb-6"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        )}

                        {/* Size Selector */}
                        <SizeSelector
                            onChangeSize={(size: string) => {
                                updateVariant({
                                    size,
                                })
                            }}
                            selectedSize={selectedSize}
                            sizes={sizes}
                        />
                        {/* 
                        <QuantitySelector
                            onChangeQuantity={setQuantity}
                            product={product}
                            quantity={quantity}
                        /> */}

                        <div className="flex items-center gap-8">
                            <Cta product={product} mini={false} onClick={() => saveOrder()} />
                            {/* <QuantityInput onQuantityChange={() => {}} initialQuantity={1} /> */}
                            <SacredQuantityInput
                                initialQuantity={1}
                                maxQuantity={10}
                                onQuantityChange={(q) => setQuantity(q)}
                                quantity={quantity}
                                // className="mt-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})


export function PackageDisplay({ pkg }: { pkg: MerchPackageRecord }) {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<Record<string, string>>({})
    const [selectedVariants, setSelectedVariants] = useState<
        Record<string, ProductVariant>
    >({})

    const handleVariantChange = (itemId: string, variant: ProductVariant) => {
        setSelectedVariants((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                ...variant,
            },
        }))
    }
    const handleSizeChange = (itemId: string, size: string) => {
        setSelectedSize((prev) => ({
            ...prev,
            [itemId]: size,
        }))
    }



    return (
        <section className="relative py-12 lg:py-20 bg-gray-1">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* Package Image */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-xl overflow-hidden bg-white shadow-3 border border-gray-3">
                            <ProductImage
                                src={pkg.image}
                                alt={pkg.name}
                                width={800}
                                height={800}
                                className="w-full h-auto"
                            />
                            {pkg.discount && (
                                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Save {pkg.discount}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Package Info */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-20 space-y-6">
                            <h1 className="font-bold text-3xl xl:text-4xl text-dark mb-2">
                                {pkg.name}
                            </h1>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-purple-800">
                                    {formatNaira(pkg.totalPrice)}
                                </span>
                                {pkg.discount && (
                                    <span className="text-xl text-gray-500 line-through">
                                        {formatNaira(pkg.totalPrice / (1 - pkg.discount / 100))}
                                    </span>
                                )}
                            </div>

                            {pkg.description && (
                                <div
                                    className="prose text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                                />
                            )}

                            {/* Package Items with Tabs */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">Package Contents</h3>

                                <div className="border-b border-gray-3">
                                    {pkg.items.map((item) => (
                                        <PackageDisplayItem
                                            key={item.productId}
                                            item={item}
                                            onChangeTab={() =>
                                                setActiveTab(
                                                    activeTab === item.productId
                                                        ? null
                                                        : item.productId
                                                )
                                            }
                                            active={activeTab === item.productId}
                                            onChangeVariant={(variant) => handleVariantChange(item.productId, variant)}
                                            onChangeSize={(size) => handleSizeChange(item.productId, size)}
                                            selectedVariant={selectedVariants[item.productId]}
                                            selectedSize={selectedSize[item.productId]}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <Cta
                                    label={pkg.isActive ? 'Place Order' : 'Coming Soon'}
                                    disabled={!pkg.isActive}
                                    // className="w-full py-4 text-lg"
                                />
                                <p className='mt-4'>Please check and select your preference</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
type ListingItem = ProductRecord | MerchPackageRecord

export function ProductCard({ item, className }: { item: ListingItem; className?: string }) {
    const isPackage = 'items' in item
    const price = isPackage ? item.totalPrice : item.price
    const discount = isPackage ? item.discount : undefined

    return (
        <Link
            href={`/shop/${item.id}`}
            // {
            //     isPackage
            //         ? `/packages/${item.name.toLowerCase().replace(/\s+/g, '-')}`
            //         : `/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`
            // }
            className={`group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 ${className}`}
        >
            {/* Image with discount badge */}
            <div className="relative aspect-square overflow-hidden">
                <ProductImage
                    src={isPackage ? item.image : item.variants[0].image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {discount}% OFF
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</h3>

                {/* Price display */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-lg">{formatNaira(price)}</span>

                    {discount && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatNaira(price / (1 - discount / 100))}
                        </span>
                    )}
                </div>

                {/* Package info if applicable */}
                {isPackage && (
                    <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">
                            Includes {item.items.length} item{item.items.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {item.items.slice(0, 4).map((pkgItem, index) => (
                                <div
                                    key={index}
                                    className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200"
                                    title={pkgItem.name}
                                >
                                    <ProductImage
                                        src={'/default-product-image.jpg'} // Fallback image
                                        alt={pkgItem.name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                    {pkgItem.quantity > 1 && (
                                        <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {pkgItem.quantity}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {item.items.length > 4 && (
                                <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
                                    +{item.items.length - 4}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Product variants if applicable */}
                {!isPackage && item.variants.length > 1 && (
                    <div className="mt-3 flex gap-1">
                        {item.variants.slice(0, 4).map((variant, index) => (
                            <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: variant.color }}
                                title={variant.color}
                            />
                        ))}
                        {item.variants.length > 4 && (
                            <div className="text-xs text-gray-500 flex items-center">
                                +{item.variants.length - 4}
                            </div>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                <button
                    className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                    onClick={(e) => e.preventDefault()} // Prevent link navigation
                >
                    {isPackage ? 'View Package' : 'View Product'}
                </button>
            </div>
        </Link>
    )
}

export function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Gallery Skeleton */}
                <div className="w-full lg:w-1/2">
                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                    <div className="flex gap-2 mt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-16 h-16 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="mt-12">
                <div className="flex border-b border-gray-200">
                    {['Description', 'Details', 'Reviews'].map((tab) => (
                        <div key={tab} className="h-10 bg-gray-200 rounded w-24 mr-4"></div>
                    ))}
                </div>
                <div className="h-64 bg-gray-100 rounded mt-4"></div>
            </div>
        </div>
    )
}

export function ErrorMessage({
    title,
    message,
    redirectUrl,
    redirectText,
}: {
    title: string
    message: string
    redirectUrl: string
    redirectText: string
}) {
    return (
        <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-red-600 mb-3">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
                href={redirectUrl}
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                {redirectText}
            </Link>
        </div>
    )
}

export function ShopFilters({
    searchQuery,
    categoryId,
    typeFilter,
}: {
    searchQuery: string
    categoryId?: number
    typeFilter?: string
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileSearch className="text-gray-400" />
                </div>
                <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="Search products..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            {/* Type Filter */}
            <div className="flex space-x-4">
                <Link
                    href={`/shop?search=${searchQuery}&category=${categoryId || ''}`}
                    className={`px-4 py-2 rounded-md ${!typeFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    All
                </Link>
                <Link
                    href={`/shop?search=${searchQuery}&category=${categoryId || ''}&type=product`}
                    className={`px-4 py-2 rounded-md ${typeFilter === 'product' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Products
                </Link>
                <Link
                    href={`/shop?search=${searchQuery}&category=${categoryId || ''}&type=package`}
                    className={`px-4 py-2 rounded-md ${typeFilter === 'package' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Packages
                </Link>
            </div>
        </div>
    )
}

interface ProductDisplayHeaderProps {
    total: number
    current: number
    searchQuery?: string
    itemsPerPage?: number
    className?: string
}

export function ProductDisplayHeader({
    total,
    current,
    searchQuery = '',
    itemsPerPage = 12,
    className = '',
}: ProductDisplayHeaderProps) {
    const showingFrom = (current - 1) * itemsPerPage + 1
    const showingTo = Math.min(current * itemsPerPage, total)
    const totalPages = Math.ceil(total / itemsPerPage)

    return (
        <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${className}`}
        >
            {/* Results Count and Search Term */}
            <div className="flex-1">
                {searchQuery ? (
                    <div className="flex items-center flex-wrap gap-2">
                        <h2 className="text-lg font-medium text-gray-800">
                            Showing {showingFrom}-{showingTo} of {total} results for:
                        </h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                            "{searchQuery}"
                            <button
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                    // Implement clear search functionality
                                    // e.g., router.push('/shop')
                                }}
                            >
                                {/* <FiX size={16} /> */}
                            </button>
                        </span>
                    </div>
                ) : (
                    <h2 className="text-lg font-medium text-gray-800">
                        Showing {showingFrom}-{showingTo} of {total} items
                    </h2>
                )}
            </div>

            {/* Sort and Filter Indicators */}
            <div className="flex items-center gap-4">
                {/* Current Page Indicator */}
                {totalPages > 1 && (
                    <div className="hidden sm:block text-sm text-gray-600">
                        Page {current} of {totalPages}
                    </div>
                )}

                {/* Filter Indicator (can be made interactive) */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    {/* <FiFilter size={16} /> */}
                    <span className="text-sm font-medium">Filters</span>
                </button>
            </div>
        </div>
    )
}

