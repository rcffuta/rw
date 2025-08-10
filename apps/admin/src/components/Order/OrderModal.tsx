import { ModalStatus, useManageOrder } from '@/hooks/useOrder'
import { OrderRecord, OrderStatus } from '@rcffuta/ict-lib'
import { formatNaira, openInNewTab, revertId } from '@rw/shared'
import Link from 'next/link'
import { PropsWithChildren, ReactNode, useState } from 'react'

interface OrderModalProps {
	order: OrderRecord
	onClose: () => void
	onStatusChange?: ModalStatus
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

export const OrderModal = ({ order, onClose, onStatusChange }: OrderModalProps) => {


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
		<>
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
						onAction={(reason) => handleAction(order.id, reason)}
					/>
				}
			>
				<div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
							{/* Header */}
							<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
								<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
									Order #{revertId(order.id) || order.paymentRef?.slice(0, 8)}
								</h3>
								<span
									className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[order.status]}`}
								>
									{order.status.toUpperCase()}
								</span>
							</div>

							{/* Customer Info */}
							<div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
								<h4 className="mb-2 text-base font-medium text-gray-900 dark:text-white">
									Customer Information
								</h4>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<p className="text-base font-medium text-gray-600 dark:text-gray-5">
											Name: {order.customer.name}
										</p>
										<p className="text-base font-medium text-gray-600 dark:text-gray-5">
											Email: {order.customer.email}
										</p>
									</div>
									<div>
										<p className="text-base font-medium text-gray-600 dark:text-gray-5">
											Phone: {order.customer.phone}
										</p>
										{order.deliveryInfo?.phoneNumber && (
											<p className="text-base font-medium text-gray-600 dark:text-gray-5">
												Delivery Phone: {order.deliveryInfo.phoneNumber}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Order Items */}
							<div className="mb-6">
								<h4 className="mb-3 text-base font-medium text-gray-900 dark:text-white">
									Order Items
								</h4>
								<div className="space-y-4">
									{order.items.map((item, index) => (
										<div key={index} className="border-b pb-4 last:border-b-0">
											<div className="flex justify-between">
												<div className="flex flex-wrap items-start gap-2 space-x-4">
													{item.itemType === 'product' ? (
														<img
															src={item.variant.image}
															alt={`${item.variant.color} ${item.name}`}
															className="h-16 w-16 rounded object-cover"
														/>
													) : (
														<div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100">
															<span className="text-xs text-gray-500">
																Package
															</span>
														</div>
													)}
													<div>
														<p className="text-base font-medium">
															{item.name}
														</p>
														<p className="text-base font-medium text-gray-600 dark:text-gray-5">
															Qty: {item.quantity}
															{', '}
															{formatNaira(item.price)} each
														</p>
													</div>
												</div>
												<div className="hidden text-right md:block">
													<p className="text-base font-semibold">
														{formatNaira(item.price * item.quantity)}
													</p>
												</div>
											</div>

											{/* Variant details */}
											<div className="pl-1 md:ml-20">
												{item.itemType === 'product' ? (
													<div className="text-base font-medium text-gray-600 dark:text-gray-5">
														<p>Color: {item.variant.color}</p>
														<p>Size: {item.variant.size}</p>
													</div>
												) : (
													<div className="text-base font-medium text-gray-600 dark:text-gray-5">
														<p className="text-base font-medium">
															Contains:
														</p>
														<ul className="list-disc pl-5">
															{item.variant.map((v, i) => (
																<li key={i}>
																	{v.color} - {v.size}
																</li>
															))}
														</ul>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Order Summary */}
							<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
								<div className="mb-2 flex justify-between">
									<span className="text-base font-medium">Subtotal:</span>
									<b className="text-lg font-semibold">
										{formatNaira(order.totalAmount)}
									</b>
								</div>
								{order.paymentRef && (
									<div className="flex flex-col justify-between text-base font-medium text-gray-600 dark:text-gray-5">
										{order.paymentRef ? (
											<Link
												href={order.paymentRef}
												className="text-blue-500"
												onClick={(e) => {
													e.preventDefault()
													openInNewTab(order.paymentRef)
												}}
											>
												Download Payment Proof
											</Link>
										) : (
											'No Payment proof yet'
										)}
									</div>
								)}
								{order.deliveryInfo?.deliveryDate && (
									<div className="mt-2 flex justify-between text-base font-medium text-gray-600 dark:text-gray-5">
										<span>Estimated Delivery:</span>
										<span>
											{new Date(
												order.deliveryInfo.deliveryDate
											).toLocaleDateString()}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Footer with CTAs */}
				<div className="sticky bottom-0 z-10 bg-white px-4 py-3 dark:bg-gray-800 sm:flex sm:flex-row-reverse sm:px-6">
					{statusActions[order.status].map((action) => {
						const isCancel = action.includes('Cancel') || action.includes('Delete')
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
								className={`inline-flex w-full justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:font-medium ${
									isCancel
										? 'bg-red-600 hover:bg-red-700'
										: 'my-2 bg-indigo-600 hover:bg-indigo-700 md:my-0'
								} ${isProcessing ? 'cursor-not-allowed opacity-70' : ''}`}
							>
								{isProcessing ? 'Processing...' : action}
							</button>
						)
					})}
					<button
						type="button"
						onClick={onClose}
						className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-7 dark:text-white sm:ml-3 sm:mt-0 sm:w-auto sm:font-medium"
					>
						Close
					</button>
				</div>
			</ModalWrapper>
		</>
	)
}

export function ModalWrapper({onClose, children, modal}: PropsWithChildren & {onClose: VoidFunction, modal: ReactNode}) {

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				{/* Background Overlay */}
				<div
					className="fixed inset-0 bg-dark-2/45 transition-opacity"
					onClick={onClose}
					aria-hidden="true"
				/>

				{/* Modal container */}
				<div className="relative z-10 mt-18 max-h-screen w-full max-w-4xl overflow-y-auto rounded-lg bg-white py-5 shadow-xl dark:bg-gray-dark md:mt-0 md:py-0">
					{children}
				</div>
			</div>

			{modal}
		</div>
	)
}


interface ConfirmActionModalProps {
	action: string;
	showReasonInput?: boolean;
	onCancel: VoidFunction;
	onAction: (reason?:string)=>void;
	loading?: boolean;
	show: boolean;
}
export function ConfirmActionModal(props: ConfirmActionModalProps) {
	const {
		action,
		onAction,
		onCancel,
		showReasonInput,
		loading,
		show
	} = props;
	const [reason, setReason] = useState('');

	if (!show){
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				<h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
					Confirm Action
				</h2>
				<p className="mb-6 text-gray-700 dark:text-gray-300">
					Are you sure you want to{' '}
					<span className="font-bold" style={{ textTransform: 'capitalize' }}>
						{action}
					</span>
					?
				</p>
				{showReasonInput && (
					<div className="px-4 pb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Cancellation Reason
						</label>
						<textarea
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							rows={3}
							className="mt-1 w-full rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white sm:text-sm"
							placeholder="Optional, but recommended for accountability"
						/>
					</div>
				)}
				<div className="flex justify-end gap-3">
					<button
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
						onClick={onCancel}
						disabled={loading}
					>
						Cancel
					</button>
					<button
						className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
						onClick={() => onAction(reason)}
						disabled={loading}
					>
						{loading ? 'Processing...' : 'Yes, Confirm'}
					</button>
				</div>
			</div>
		</div>
	)
}