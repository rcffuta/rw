import TableListTab from '@/components/ui/TableListTab'
import { PropsWithChildren } from 'react'

export default function ProductPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<TableListTab
				pageName="Products"
				createLink="/products/add"
				createLinkLabel="Add Product"
			/>

			{children}
		</>
	)
}
