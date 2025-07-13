import Breadcrumb from '@/components/ui/BreadCrumb'
import TableListTab from '@/components/ui/TableListTab'
import { PropsWithChildren } from 'react'

export default function CategoryPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<TableListTab
				pageName="Product Categories"
				createLink="/categories/add"
				createLinkLabel="Add Category"
			/>

			{children}
		</>
	)
}
