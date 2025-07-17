import { ExportButton } from '@/components/Order/StatusActionButton'
import Breadcrumb from '@/components/ui/BreadCrumb'
// import { OrderProvider } from '@/context/OrderContext'
// import { ExportAsPDF } from '@/utils/exportAsPdf'
import { PropsWithChildren } from 'react'

export default function OrderPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<Breadcrumb
				pageName="Orders"
				paths={[
					{
						label: (
							<div className="flex items-center justify-center gap-2">
								{/* <span>Export Pre Orders</span>
								<ExportButton /> */}
								<ExportButton/>
							</div>
						)
					}
				]}
			/>
			{children}
		</>
	)
}
