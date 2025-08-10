import { OrderStatus } from "@rcffuta/ict-lib"
import { useState } from "react"

export type ModalStatus = (orderId: string, newStatus: OrderStatus, reason?: string) => void;

interface Props {
	onClose: VoidFunction
	onStatusChange?: ModalStatus;
}
export function useManageOrder({onClose, onStatusChange}: Props) {
	const [action, setAction] = useState<string | null>(null)
	
	const [isProcessing, setIsProcessing] = useState(false)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [showReasonInput, setShowReasonInput] = useState(false);
    // const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

	const handleAction = async (activeOrderId:string, reason?: string) => {
		if (!activeOrderId || !action) return

		if (isProcessing) return
		setIsProcessing(true)
		try {
			// Determine what status change this action represents
			let newStatus: OrderStatus | null = null

			switch (action) {
				case 'Mark as Paid':
					newStatus = 'paid'
					break
				case 'Mark for Shipping':
					newStatus = 'pending'
					break
				case 'Mark for Pickup':
					newStatus = 'shipped'
					break
				case 'Mark as Delivered':
					newStatus = 'delivered'
					break
				case 'Cancel Order':
					newStatus = 'cancelled'
					break
				// Add other cases as needed
			}

			if (newStatus && onStatusChange) {
				await onStatusChange(activeOrderId, newStatus, reason || undefined)
			}

			// Handle other non-status actions here
			// ...
		} finally {
			setIsProcessing(false)
			setShowConfirmModal(false)

			setShowReasonInput(false)
			setAction(null)
			// setActiveOrderId(null)
			onClose()
		}
	}

    return {
        isProcessing,
        showConfirmModal,
        action,
        showReasonInput,
        handleAction,
        updateAction: (data:string | null)=>setAction(data),
        updateConfirm: (val: boolean)=>setShowConfirmModal(val),
        updateShowInput: (val:boolean) => setShowReasonInput(val),
    }
}