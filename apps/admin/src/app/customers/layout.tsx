import Breadcrumb from '@/components/ui/BreadCrumb'
// import { OrderProvider } from '@/context/OrderContext'
// import { ExportAsPDF } from '@/utils/exportAsPdf'
import { PropsWithChildren } from 'react'

export default function CustomerPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<Breadcrumb
				pageName="Customers"
				paths={[]}
			/>
			{children}
		</>
	)
}
