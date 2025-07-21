import React from 'react'
import { Metadata } from 'next'
import { ShopLayout } from '@/Layout/ShoptLayout'
import ToastFeedback from '@/components/Common/ToastFeedback'
import { APP_NAME } from '@rw/shared'
import EmptyList from '@/components/client/Shop/EmptyList'
import { ShopFilters } from '@/components/client/Shop/ShopUtil'
import { CategoryHighlight, CategoryListItems, ProductCardSkeleton, ProductHighlight, ProductListItems } from '@/components/Common/ProductUtils'
import { getFilteredPackages, getFilteredProducts } from '@/actions/product.action'

export const metadata: Metadata = {
    title: `Shop | ${APP_NAME}`,
    description: `Browse products and packages on ${APP_NAME}`,
}

type ProductsPageProps = {
    searchParams: Promise<{
        category?: string
        search?: string
        type?: 'product' | 'package'
        page?: string
    }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate data every hour

export default async function ShopPage({ searchParams: params }: ProductsPageProps) {
    const searchParams = await params;
    const categoryId = searchParams.category ? Number(searchParams.category) : undefined
    const searchQuery = searchParams.search || ''
    const typeFilter = searchParams.type
    const page = searchParams.page ? parseInt(searchParams.page) : 1

    let products: any[] = []
    let packages: any[] = []
    let error: Error | null = null
    let totalCount = 0

    try {
        if (!typeFilter || typeFilter === 'product') {
            const productResponse = await getFilteredProducts(
                // {
                //     search: searchQuery,
                //     categoryId,
                //     page,
                //     limit: 12,
                // }
            )
            products = productResponse || []
            totalCount += productResponse.length || 0
        }

        if (!typeFilter || typeFilter === 'package') {
            const packageResponse = await getFilteredPackages(
                // {
                //     search: searchQuery,
                //     page,
                //     limit: 12,
                // }
            )
            packages = packageResponse || []
            totalCount += packageResponse.length || 0
        }
    } catch (err) {
        error = err as Error
        console.error('Failed to fetch shop items:', error)
    }

    const hasItems = products.length > 0 || packages.length > 0
    const isLoading = false // You can implement loading state if needed

    return (
        <ShopLayout>
            {error && (
                <ToastFeedback
                    message={error.message || 'Error loading products!'}
                    duration={3000}
                    id="shopToast"
                    type="error"
                />
            )}

            <div className="w-full space-y-6">
                {/* Filters Section */}
                <ShopFilters
                    searchQuery={searchQuery}
                    categoryId={categoryId}
                    typeFilter={typeFilter}
                />

                {/* Display Header */}
                {/* <ProductDisplayHeader total={totalCount} current={page} searchQuery={searchQuery} /> */}

                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Products List */}
                        {(!typeFilter || typeFilter === 'product') && products.length > 0 && (
                            <div className="mb-12">
                                {/* <h2 className="text-xl font-bold mb-2">Products</h2> */}
                                <ProductListItems
                                    ctaLink={''}
                                    ctaText="" //"View More"
                                    data={products}
                                />
                            </div>
                        )}

                        {/* Packages List */}
                        {(!typeFilter || typeFilter === 'package') && packages.length > 0 && (
                            <div className="mb-12">
                                {/* <h2 className="text-xl font-bold mb-4">Packages</h2> */}
                                {/* <PackageList packages={packages} /> */}

                                <CategoryListItems
                                    // {...props}
                                    ctaLink={''}
                                    ctaText="" //"View More"
                                    data={packages}
                                    // subTitle="Merch available for you"
                                    // title="Products"
                                />
                            </div>
                        )}

                        {/* Empty State */}
                        {!hasItems && (
                            <EmptyList
                                // title="No items found"
                                title={
                                    searchQuery
                                        ? `No results for "${searchQuery}". Try different keywords.`
                                        : 'No products or packages available at the moment.'
                                }
                            />
                        )}
                    </>
                )}

                {/* Pagination would go here */}
                {/* <ProductPagination 
          currentPage={page} 
          totalPages={Math.ceil(totalCount / 12)}
        /> */}
            </div>
        </ShopLayout>
    )
}
