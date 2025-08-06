'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { OrderRecord, CustomerInfo } from '@rcffuta/ict-lib'
import { useState } from 'react'
import { Button } from '../ui-elements/button'
import { formatNaira, revertId } from '@rw/shared'
import clsx from 'clsx'
import PaymentProofPreview from '../Order/PaymentProofPreview'
import { TableRowItem } from '../ui/types'
import { GroupedOrdersByCustomer } from '@/types/analytics.types'
import { GroupedCustomerOrderModal } from './CustomerOrderModal'

type Props = {
	groupedOrders: GroupedOrdersByCustomer[];
}


export const CustomerTableHead: TableRowItem[] = [
	{
		label: 'Customer'
	},
	{
		label: 'Email'
	},
	{
		label: 'Phone'
	},
	{
		label: 'Orders'
	},
	{
		label: 'Amount'
	},
	{
		label: 'Action'
	},
]

export function CustomerTable({ groupedOrders }: Props) {
	const [selectedOrder, setSelectedOrder] = useState<GroupedOrdersByCustomer | null>(null)

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="bg-[#F7F9FC] dark:bg-dark-2">
						{CustomerTableHead.map((item, i) => (
							<TableHead key={i} className="text-center">
								{item.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{groupedOrders.map((order, idx) => (
						<TableRow key={idx}>
							<TableCell className="text-center font-semibold">
								{order.customer.name}
							</TableCell>
							<TableCell className="text-center">{order.customer.email}</TableCell>
							<TableCell className="text-center">{order.customer.phone}</TableCell>
							<TableCell className="text-center">
								<strong>{formatNaira(order.amount)}</strong>
							</TableCell>
							<TableCell className="text-center">
								{order.orders.length} Order{order.orders.length > 1 ? 's' : ''}
							</TableCell>
							<TableCell className="space-y-2 text-center">
								<Button
									label="View"
									onClick={() => setSelectedOrder(order)}
									variant="outlinePrimary"
									className="w-full"
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{selectedOrder && (
				<GroupedCustomerOrderModal
					group={selectedOrder}
					onClose={() => setSelectedOrder(null)}
					onStatusChange={() => {
						// implement status update handling if needed
					}}
				/>
			)}
		</>
	)
}


// function CTA() {
// 	return (
// 		<>
// 			{order.orders.map((order, i) => (
// 				<div key={i} className="rounded border p-2 text-sm dark:border-dark-3">
// 					<p>
// 						<b>ID:</b> {revertId(order.id)}
// 					</p>
// 					<p>
// 						<b>Total:</b> {formatNaira(order.totalAmount)}
// 					</p>
// 					<p>
// 						<b>Status:</b>{' '}
// 						<span
// 							className={clsx('rounded px-2 py-0.5 text-xs font-medium', {
// 								'bg-green-100 text-green-600': order.status === 'delivered',
// 								'bg-yellow-100 text-yellow-700': order.status === 'paid',
// 								'bg-red-100 text-red-600': order.status === 'cancelled',
// 								'bg-gray-200 text-gray-800': order.status === 'pending'
// 							})}
// 						>
// 							{order.status}
// 						</span>
// 					</p>
// 					<p>
// 						<b>Proof:</b>{' '}
// 						{order.paymentRef ? (
// 							<PaymentProofPreview paymentRef={order.paymentRef} />
// 						) : (
// 							'No Payment'
// 						)}
// 					</p>
// 					<div className="mt-2">
// 						<Button
// 							label="View"
// 							onClick={() => setSelectedOrder(order)}
// 							variant="outlinePrimary"
// 							className="w-full"
// 						/>
// 					</div>
// 				</div>
// 			))}
// 		</>
// 	)
// }