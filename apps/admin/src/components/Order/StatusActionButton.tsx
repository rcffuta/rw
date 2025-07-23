"use client";
import { ExportAsPDF } from "@/utils/exportAsPdf"
import { aggregateProducts, ProductAggregate } from '@/utils/orderUtils'
import { OrderRecord, OrderStatus, sendDeliveryNotification, sendOrderCancelledNotification, sendPickupNotification, sendShippingNotification } from "@rcffuta/ict-lib";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui-elements/button";
import { CheckCircle, CrossIcon, Loader2, Store, Truck } from "lucide-react";
import { observer } from "mobx-react-lite";
import { fetchPendingOrders } from "@/utils/actionUtils";


interface StatusActionButtonProps {
  order: OrderRecord;
  customerEmail: string;
  currentStatus: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => Promise<void>;
}

export const MarkAsCanceledButton = ({
  order,
    currentStatus,
  onStatusChange,
}: StatusActionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = false; //currentStatus !== "paid";

  const toastId = "statusToast";

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Update status
      await onStatusChange("cancelled");

      // Send email notification
      await sendOrderCancelledNotification(order);

      toast.success('Order marked as Cancelled and notification sent', { id: toastId })
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
				<CrossIcon className="h-3.5 w-3.5" />
			)}
			<span>Mark as Cancelled</span>
		</Button>
  )
};


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


export const ExportButton = observer(() => {
    const [orders, setOrders] = useState<ProductAggregate[] | null>(null);


    const loadOrder = useCallback(async ()=>{
      if (Array.isArray(orders)) return;

      const dt = await fetchPendingOrders();

      const aggregate = aggregateProducts(dt);

      setOrders(() => aggregate)
    }, [orders])

    useEffect(()=>{
        loadOrder();
    },[])


    if (orders === null) return <p>Loading...</p>;

    if(orders.length < 1) return null;


    return <ExportAsPDF aggregates={orders} />
})