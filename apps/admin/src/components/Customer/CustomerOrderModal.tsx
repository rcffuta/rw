'use client'

import { OrderRecord, OrderStatus } from '@rcffuta/ict-lib'
import { formatNaira, openInNewTab, revertId } from '@rw/shared'
import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { GroupedOrdersByCustomer } from '@/types/analytics.types'
import { useManageOrder } from '@/hooks/useOrder'
import { ConfirmActionModal, ModalWrapper } from '../Order/OrderModal'

interface GroupedCustomerOrderModalProps {
	group: GroupedOrdersByCustomer
	onClose: () => void
	onStatusChange?: (orderId: string, newStatus: OrderStatus, reason?: string) => void
}


const statusActions: Record<OrderStatus, string[]> = {
	cart: ['Mark as Paid', 'Cancel Order'],
	paid: ['Mark for Shipping', 'Cancel Order'],
	pending: ['Mark for Pickup', 'Cancel Order'],
	shipped: ['Mark as Delivered', 'Cancel Order'],
	delivered: [],
	cancelled: []
}

const statusColors: Record<OrderStatus, string> = {
	cart: 'bg-amber-100 text-amber-800',
	pending: 'bg-blue-100 text-blue-800',
	paid: 'bg-green-100 text-green-800',
	shipped: 'bg-indigo-100 text-indigo-800',
	delivered: 'bg-purple-100 text-purple-800',
	cancelled: 'bg-red-100 text-red-800'
}

export function GroupedCustomerOrderModal({
	group,
	onClose,
	onStatusChange
}: GroupedCustomerOrderModalProps) {
	
	const {
		handleAction,
		action,
		isProcessing,
		showConfirmModal,
		showReasonInput,
		updateAction,
		updateConfirm,
		updateShowInput
	} = useManageOrder({
		onClose,
		onStatusChange
	})


	return (
		<ModalWrapper
			onClose={onClose}
			modal={
				<ConfirmActionModal
					show={showConfirmModal}
					action={action || ''}
					loading={isProcessing}
					showReasonInput={showReasonInput}
					onCancel={() => {
						updateConfirm(false)
						updateAction(null)
					}}
					onAction={() => handleAction()}
				/>
			}
		>
			<div className="mx-auto my-10 w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-gray-dark">
				{/* Header */}
				<div className="mb-4">
					<h2 className="text-xl font-semibold">Customer Details</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Viewing all orders by this customer
					</p>
				</div>

				{/* Customer Info */}
				<div className="mb-6 rounded bg-gray-50 p-4 dark:bg-gray-800">
					<p>
						<strong>Name:</strong> {group.customer.name}
					</p>
					<p>
						<strong>Email:</strong> {group.customer.email}
					</p>
					<p>
						<strong>Phone:</strong> {group.customer.phone}
					</p>
					<p>
						<strong>Total Spent:</strong> {formatNaira(group.amount)}
					</p>
				</div>

				{/* Orders */}
				<div className="max-h-[500px] overflow-y-auto pr-2">
					{group.orders.map((order) => (
						<div key={order.id} className="mb-8 border-b pb-6">
							<div className="mb-2 flex flex-wrap-reverse gap-3 items-center justify-between">
								<h3 className="text-lg font-medium">Order #{revertId(order.id)}</h3>
								<span
									className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[order.status]}`}
								>
									{order.status.toUpperCase()}
								</span>
							</div>

							{/* Order Items */}
							{order.items.map((item, idx) => (
								<div key={idx} className="mb-3 flex items-start gap-4">
									<img
										src={
											item.itemType === 'product'
												? item.variant.image
												: item.variant[0]?.image || '/placeholder.png'
										}
										alt={item.name}
										className="h-16 w-16 rounded object-cover"
									/>
									<div>
										<p className="font-medium">{item.name}</p>
										<p className="text-sm text-gray-500">
											Qty: {item.quantity} × {formatNaira(item.price)}
										</p>
										{item.itemType === 'product' ? (
											<p className="text-xs text-gray-400">
												Variant: {item.variant.color} - {item.variant.size}
											</p>
										) : (
											<p className="text-xs text-gray-400">
												Includes:{' '}
												{item.variant
													.slice(0, 2)
													.map((v) => `${v.color} (${v.size})`)
													.join(', ')}
												{item.variant.length > 2 && '...'}
											</p>
										)}
									</div>
								</div>
							))}

							{/* Summary + Actions */}
							<div className="mt-2 flex flex-wrap gap-4 items-center justify-between">
								<p className="font-semibold">
									Total: {formatNaira(order.totalAmount)}
								</p>
								<div className="flex flex-wrap gap-2">
									{statusActions[order.status].map((action) => {
										const isCancel =
											action.includes('Cancel') || action.includes('Delete')
										return (
											<button
												key={action}
												type="button"
												disabled={isProcessing}
												onClick={() => {
													updateAction(action)
													updateConfirm(true)

													if (isCancel) {
														updateShowInput(true)
													}
												}}
												className={`inline-flex justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm ${
													isCancel
														? 'bg-red-600 hover:bg-red-700'
														: 'bg-indigo-600 hover:bg-indigo-700'
												} ${isProcessing ? 'cursor-not-allowed opacity-70' : ''}`}
											>
												{isProcessing ? 'Processing...' : action}
											</button>
										)
									})}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Close Button */}
				<div className="mt-6 text-right">
					<button
						onClick={onClose}
						className="rounded border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
					>
						Close
					</button>
				</div>
			</div>
		</ModalWrapper>
	)
}
