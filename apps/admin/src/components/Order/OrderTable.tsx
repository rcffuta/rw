'use client'

import { CheckIcon } from '@/components/Icons'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { formatCurrency, useNavigate } from '../../../../../packages/shared'
import { TableRowItem } from '../ui/types'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { sendProductToCustomer } from '@/actions/order.action'
import { Order, OrderItem, OrderRecord, OrderStatus, wait } from '@rcffuta/ict-lib'
import { MarkAsDeliveredButton, MarkAsShippingButton, MarkForPickupButton } from './StatusActionButton'
import { useOrderContext } from '@/context/OrderContext'

type OrderType = OrderRecord

type OrderProps = {
	orders: OrderType[]
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
		label: 'Payment Reference'
	},
	{
		label: 'Payment Date'
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



export function OrderTable({ orders }: OrderProps) {
	return (
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
				<RowItem orders={orders} />
			</TableBody>
		</Table>
	)
}


function RowItem({ orders }: { orders: OrderType[] }) {
	const { updateOrderStatus } = useOrderContext()

	const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
		try {
			// In a real app, you would call your API here
			// await api.patch(`/orders/${orderId}`, { status: newStatus });

			// Update local state
			updateOrderStatus(orderId, newStatus)
		} catch (error) {
			throw error
		}
	}

	return (
		<>
			{orders.map((order, index) => {
				const orderId = `ORD-${order.id}`
				return (
					<TableRow key={index} className="border-[#eee] dark:border-dark-3">
						<TableCell className="text-center">
							<h5 className="text-dark dark:text-white">{orderId}</h5>
						</TableCell>

						<TableCell className="min-w-[155px] text-center text-dark dark:text-white xl:pl-7.5">
							<p className="mt-[3px] text-body-sm font-medium">
								{order.item.name}{' '}
								{order.item.quantity > 1 ? `(x${order.item.quantity})` : null}
							</p>
						</TableCell>

						<TableCell className="text-center font-mono font-semibold text-dark dark:text-white">
							{formatCurrency(order.item.price * order.item.quantity)}
						</TableCell>

						<TableCell className="text-center text-dark dark:text-white">
							{order.paymentRef || 'No Payment'}
						</TableCell>

						<TableCell className="text-center text-dark dark:text-white">
							{/* {item.payment?.paidAt?.toDateString() || null} */}
							-- Payment Date --
						</TableCell>

						<TableCell>
							<div
								className={clsx(
									'mx-auto max-w-fit rounded-full px-3.5 py-1 text-sm font-medium',
									{
										'bg-[#219653]/[0.08] text-[#219653]':
											order.status === 'delivered',
										'bg-[#D34053]/[0.08] text-[#D34053]':
											order.status === 'cancelled',
										'bg-[#FFA70B]/[0.08] text-[#FFA70B]':
											order.status === 'paid',
										'bg-[#FFA70B]/[0.08] text-gray-6':
											order.status === 'pending'
									}
								)}
							>
								{order.status}
							</div>
						</TableCell>

						<TableCell className="xl:pr-7.5">
							<div className="flex items-center justify-center gap-2">
								<MarkAsShippingButton
									orderId={order.id}
									customerEmail={order.customer.email}
									currentStatus={order.status}
									onStatusChange={(newStatus) =>
										handleStatusChange(order.id, newStatus)
									}
								/>
								<MarkForPickupButton
									orderId={order.id}
									customerEmail={order.customer.email}
									currentStatus={order.status}
									onStatusChange={(newStatus) =>
										handleStatusChange(order.id, newStatus)
									}
								/>
								<MarkAsDeliveredButton
									orderId={order.id}
									customerEmail={order.customer.email}
									currentStatus={order.status}
									onStatusChange={(newStatus) =>
										handleStatusChange(order.id, newStatus)
									}
								/>
							</div>
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
