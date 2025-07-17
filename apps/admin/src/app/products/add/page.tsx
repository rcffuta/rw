
import AddProductForm from '@/components/Product/ProductForm'
import Breadcrumb from '@/components/ui/BreadCrumb'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Product'
}

export default function Page() {
	return (
		<>
			<Breadcrumb
				pageName="Product"
				paths={[
					{
						label: 'Products',
						link: '/products'
					},
					{
						label: 'Add'
					}
				]}
			/>

			<AddProductForm />
		</>
	)
}
