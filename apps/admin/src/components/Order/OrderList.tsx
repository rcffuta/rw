'use client'

import { OrderTable } from './OrderTable'
import EmptyRow from '../Tables/EmptyTable'
import { OrderRecord } from '@rcffuta/ict-lib'

type Props = {
	orders: OrderRecord[]
}

export function OrderList({ orders }: Props) {

	let template

	if (orders.length < 1)
		template = <EmptyRow description="Orders will show here when customers make orders" />
	else template = <OrderTable orders={orders} />

	return (
		<div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
			{template}
		</div>
	)
}
