
import ProductInputForm from '@/components/Product/ProductForm'
import Breadcrumb from '@/components/ui/BreadCrumb'
import { getProductById } from '@rcffuta/ict-lib'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Product'
}


type Props = { params: Promise<{ id: string }> };


export default async function Page({ params }: Props) {
	const productId = (await params).id
	const {
		message,
		success,
		data
	} = await getProductById(productId);


	if (!success) {
		console.error(message);
		return notFound();
	}


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
						label: 'Modify'
					}
				]}
			/>

			<ProductInputForm product={data}/>
		</>
	)
}
