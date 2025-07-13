import Breadcrumb from '@/components/ui/BreadCrumb'
import { PropsWithChildren } from 'react'

export default function OrderPageRoot({ children }: PropsWithChildren) {
	return (
		<>
			<Breadcrumb
				pageName="Orders"
				paths={[
					{
						label: 'Order'
					}
				]}
			/>
			{children}
		</>
	)
}
