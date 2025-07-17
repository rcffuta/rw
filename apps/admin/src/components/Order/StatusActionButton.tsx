"use client";
import { ExportAsPDF } from "@/utils/exportAsPdf"
import { aggregateByVariants, VariantAggregate } from "@/utils/orderUtils"
import { OrderRecord, OrderStatus } from "@rcffuta/ict-lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui-elements/button";
import { CheckCircle, Loader2, Store, Truck } from "lucide-react";
import { sendDeliveryNotification, sendPickupNotification, sendShippingNotification } from "@/utils/mailUtils";


interface StatusActionButtonProps {
  order: OrderRecord;
  customerEmail: string;
  currentStatus: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => Promise<void>;
}

export const MarkAsShippingButton = ({
  order,
    currentStatus,
  onStatusChange,
}: StatusActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = currentStatus !== "paid";

  const toastId = "statusToast";

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Update status
      await onStatusChange("pending");

      // Send email notification
      await sendShippingNotification(order);

      toast.success('Order marked as shipping and notification sent', { id: toastId })
    } catch (error) {
      toast.error('Failed to update order status', { id: toastId })
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDisabled) return null;

  return (
		<Button
			label=""
			//   variant="outline"
			//   size="sm"
			size={'small'}
			variant={'outlinePrimary'}
			onClick={handleClick}
			disabled={isDisabled || isLoading}
			className="gap-1.5"
			aria-label="Mark as shipping"
		>
			{isLoading ? (
				<Loader2 className="h-3.5 w-3.5 animate-spin" />
			) : (
				<Truck className="h-3.5 w-3.5" />
			)}
			<span>Mark as Shipping</span>
		</Button>
  )
};

export const MarkForPickupButton = ({
  order,
  currentStatus,
  onStatusChange,
}: StatusActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = currentStatus !== "pending";

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Update status
      await onStatusChange("shipped");

      // Send email notification
      await sendPickupNotification(order);

      toast.success("Order ready for pickup and notification sent");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDisabled) return null

  return (
    <Button
    //   variant="outline"
    //   size="sm"
        label=""
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      className="gap-1.5"
      size={"small"}
      variant={"outlineDark"}
      aria-label="Mark for pickup"
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Store className="w-3.5 h-3.5" />
      )}
      <span>Mark for Pickup</span>
    </Button>
  );
};

export const MarkAsDeliveredButton = ({
	order,
		currentStatus,
	onStatusChange
}: StatusActionButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const isDisabled = currentStatus !== 'shipped';

	const handleClick = async () => {
		setIsLoading(true)
		try {
			// Update status
			await onStatusChange('delivered')

			// Send delivery confirmation email
			await sendDeliveryNotification(order)

			toast.success('Order marked as delivered and notification sent')
		} catch (error) {
			toast.error('Failed to update order status')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

    if (isDisabled) return null

	return (
		<Button
            label=""
			variant="outlineGreen"
			size="small"
			onClick={handleClick}
			disabled={isDisabled || isLoading}
			className="gap-1.5 border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
			aria-label="Mark as delivered"
		>
			{isLoading ? (
				<Loader2 className="h-3.5 w-3.5 animate-spin" />
			) : (
				<CheckCircle className="h-3.5 w-3.5" />
			)}
			<span>Mark as Delivered</span>
		</Button>
	)
}


export const ExportButton = () => {
    // const { orders } = useOrderContext() // Assuming you have access to orders

    const [preorders, setPreOrders] = useState<VariantAggregate[]>([]);
      function loadPreorders() {
      const aggregates = aggregateByVariants([])
      setPreOrders(() => aggregates)
    }

    useEffect(()=>{
        

        loadPreorders()
    },[])


    if(preorders.length < 1) return null;


    return <ExportAsPDF aggregates={preorders} />
}