import Breadcrumb from '@/components/ui/BreadCrumb'
import TableListTab from '@/components/ui/TableListTab'
import { ADD_PACKAGE_LINK } from '@/data/links'
import { PropsWithChildren } from 'react'

export default function CategoryPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<TableListTab
				pageName="Packages"
				createLink={ADD_PACKAGE_LINK}
				createLinkLabel="Add Package"
			/>

			{children}
		</>
	)
}
