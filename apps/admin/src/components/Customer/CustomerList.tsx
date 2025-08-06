'use client'

import { GroupedOrdersByCustomer } from '@/types/analytics.types'
import { OrderTable } from '../Order/OrderTable'
import EmptyRow from '../Tables/EmptyTable'
import { OrderRecord } from '@rcffuta/ict-lib'
import { CustomerTable } from './CustomerTable'

type Props = {
	orders: GroupedOrdersByCustomer[]
}

export function CustomerList({ orders }: Props) {

	let template

	if (orders.length < 1)
		template = <EmptyRow description="Orders will show here when customers make orders" />
	else template = <CustomerTable groupedOrders={orders}/>

	return (
		<div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
			{template}
		</div>
	)
}
