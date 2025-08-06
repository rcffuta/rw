'use client'

import { CheckIcon } from '@/components/Icons'
import {
	Table,
	TableAction,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { formatNaira, revertId, useNavigate } from '@rw/shared'
import { TableRowItem } from '../ui/types'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { OrderItem, OrderRecord, OrderStatus, sendDeliveryNotification, sendOrderCancelledNotification, sendOrderPaymentApprovedNotification, sendPickupNotification, sendShippingNotification, updateOrder } from '@rcffuta/ict-lib'
import { observer } from 'mobx-react-lite'
import PaymentProofPreview from './PaymentProofPreview'
import { useState } from 'react'
import { OrderModal } from './OrderModal'
import { Button } from '../ui-elements/button'

type OrderType = OrderRecord

type OrderProps = {
	orders: OrderType[]
}


export function sortOrdersByAmount(orders: OrderType[], order: 'asc' | 'desc' = 'desc'): OrderType[] {
	const statusPriority: OrderStatus[] = ['pending', 'paid', 'cart', 'shipped']

	return [...orders].sort((a, b) => {
		const aPriority = statusPriority.indexOf(a.status)
		const bPriority = statusPriority.indexOf(b.status)

		const hasAPriority = aPriority !== -1
		const hasBPriority = bPriority !== -1

		// 1. Sort by priority if both statuses are known
		if (hasAPriority && hasBPriority && aPriority !== bPriority) {
			return aPriority - bPriority
		}

		// 2. Known status before unknown status
		if (hasAPriority !== hasBPriority) {
			return hasAPriority ? -1 : 1
		}

		// 3. If same priority or both unknown, sort by amount
		return order === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount
	})
}







export const OrderTableHead: TableRowItem[] = [
	{
		label: 'OrderId'
	},
	{
		label: 'Product'
	},
	{
		label: 'Amount'
	},
	{
		label: 'Payment Proof'
	},
	{
		label: 'Status'
	},	
	{
		label: 'Action'
	},	
	// {
	// 	label: (
	// 		<div className="flex items-center justify-center gap-2">
	// 			<span>Action</span>
	// 			<ExportButton />
	// 		</div>
	// 	)
	// }
]



export const OrderTable = observer(({ orders }: OrderProps) => {
	const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
	const { refresh } = useNavigate()

	const handleStatusChange = async (order: OrderRecord, newStatus: OrderStatus, reason?: string) => {
		try {

			switch (newStatus) {
				case "cancelled":
					await updateOrder(order.id, {
						status: newStatus
					})
					await sendOrderCancelledNotification(order, reason || "Please reach out to the committee");
					break;
				case "delivered":
					await updateOrder(order.id, {
						status: newStatus
					})
					await sendDeliveryNotification(order);
					break;
				case "paid":
					await updateOrder(order.id, {
						status: newStatus
					})
					await sendOrderPaymentApprovedNotification(order);
					break;
				case "pending":
					await updateOrder(order.id, {
						status: newStatus
					})
					await sendShippingNotification(order);
					break;
				case "shipped":
					await updateOrder(order.id, {
						status: newStatus
					})
					await sendPickupNotification(order);
					break;
				default:
					toast.error(`Set to "${newStatus}" Action Not Available`, {
						id: order.id + newStatus
					});
			}


			// setSelectedOrder((e) => e ? { ...e, status: newStatus } : null);


			setTimeout(()=>{
				refresh();
			}, 1000)
			

		} catch (error) {
			throw error
		}
	}

	const data = sortOrdersByAmount(orders);
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
						{OrderTableHead.map((item, i) => (
							<TableHead key={i} className="text-center">
								{item.label}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					<RowItem orders={data} onViewOrder={(order) => setSelectedOrder(order)} />
				</TableBody>
			</Table>

			{selectedOrder && (
				<OrderModal
					order={selectedOrder}
					onClose={() => setSelectedOrder(null)}
					onStatusChange={async (id, newStatus, reason?: string) => {
						await handleStatusChange(selectedOrder, newStatus, reason)
					}}
				/>
			)}
		</>
	)
}
)

function RowItem({
	orders,
	onViewOrder
}: {
	orders: OrderType[]
	onViewOrder: (order: OrderRecord) => void
}) {
	function parserderItems(orderItems: OrderItem[]): string {
		return orderItems.reduce((acc, item) => {
			if (item.itemType === 'product') {
				return (
					acc +
					// `x${item.quantity} ${item.name} ( ${item.variant.color} | ${item.variant.size} )\n`
					`x${item.quantity} ${item.name}\n`
				)
			}
			if (item.itemType === 'package') {
				return acc + `${item.name} (x${item.quantity})\n` + ''

				// item.variant.reduce((variantAcc, variantItem) => {
				// 	return variantAcc + `${variantItem.color} ${variantItem.size}\n`
				// }, '')
			}
			return acc
		}, '')
	}

	return (
		<>
			{orders.map((order, index) => {
				// const orderId = revertId(order.id);
				return (
					<TableRow key={index} className="z-9 border-[#eee] dark:border-dark-3">
						<TableCell className="text-center">
							<a
								href={`rw.rcffuta.com/order/${order.id}`}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => {
									e.preventDefault()
									toast.error('This feature is not available yet')
								}}
								className="cursor-pointer text-primary hover:underline"
								title="View Order Details"
							>
								{revertId(order.id)}
							</a>
						</TableCell>

						<TableCell className="min-w-[155px] text-center text-dark dark:text-white xl:pl-7.5">
							<p className="mt-[3px] text-body-sm font-medium">
								{parserderItems(order.items)}
							</p>
						</TableCell>

						<TableCell className="text-center font-mono font-semibold text-dark dark:text-white">
							{formatNaira(order.totalAmount)}
						</TableCell>

						<TableCell className="text-center text-dark dark:text-white">
							{order.paymentRef ? (
								<PaymentProofPreview paymentRef={order.paymentRef} />
							) : (
								'No Payment'
							)}
						</TableCell>

						<TableCell>
							<p
								className={clsx(
									'mx-auto max-w-fit rounded-full px-3.5 py-1 text-sm font-medium',
									{
										'bg-[#219653]/[0.08] text-[#219653]':
											order.status === 'delivered',
										'bg-[#D34053]/[0.08] text-[#D34053]':
											order.status === 'cancelled',
										'bg-[#FFA70B]/[0.08] text-[#FFA70B]':
											order.status === 'paid',
										'bg-[#FFA70B]/[0.08] text-gray-2':
											order.status === 'pending',
										'bg-neutral-900 text-gray-6': order.status === 'cart'
									}
								)}
							>
								{order.status}
							</p>
						</TableCell>

						<TableCell className="text-center xl:pr-7.5">
							<Button
								label="View Order"
								// size={'default'}
								variant={'primary'}
								onClick={() => {
									onViewOrder(order)
								}}
								// disabled={isDisabled || isLoading}
								className="mx-auto gap-1.5"
								aria-label="Mark as shipping"
							/>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
}

// export function OrderTableSkeleton() {
//     return (
//         <TableSkeleton
//             tableHeads={tableHead}
//             title="Orders"
//         />
//     )
// }
