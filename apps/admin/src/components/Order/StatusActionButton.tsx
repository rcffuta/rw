"use client";
import { useOrderContext } from "@/context/OrderContext"
import { ExportAsPDF } from "@/utils/exportAsPdf"
import { aggregateByVariants, VariantAggregate } from "@/utils/orderUtils"
import { DownloadIcon } from "../Tables/icons"
import { OrderRecord, OrderStatus } from "@rcffuta/ict-lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui-elements/button";
import { CheckCircle, Loader2, Store, Truck } from "lucide-react";


interface StatusActionButtonProps {
  orderId: string;
  customerEmail: string;
  currentStatus: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => Promise<void>;
}

export const MarkAsShippingButton = ({
  orderId,
  customerEmail,
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
      await sendShippingNotification(customerEmail, orderId);

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
  orderId,
  customerEmail,
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
      await sendPickupNotification(customerEmail, orderId);

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
	orderId,
	customerEmail,
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
			await sendDeliveryNotification(customerEmail, orderId)

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

// Email notification function
async function sendDeliveryNotification(email: string, orderId: string) {
	// In a real app, call your email service API
	console.log(`Delivery notification sent to ${email} for order ${orderId}`)
	await new Promise((resolve) => setTimeout(resolve, 500))

	// Example real implementation:
	/*
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: `Your Order #${orderId} has been delivered!`,
      html: `
        <p>Hello,</p>
        <p>We're happy to inform you that your order #${orderId} has been successfully delivered!</p>
        <p>Thank you for your purchase!</p>
        <p>Order details: [LINK]</p>
      `
    })
  });
  */
}

// Email notification functions (mock implementations)
async function sendShippingNotification(email: string, orderId: string) {
  // In a real app, call your email service API
  console.log(`Shipping notification sent to ${email} for order ${orderId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
}

async function sendPickupNotification(email: string, orderId: string) {
  // In a real app, call your email service API
  console.log(`Pickup notification sent to ${email} for order ${orderId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
}

export const ExportButton = () => {
    const { orders } = useOrderContext() // Assuming you have access to orders

    const [preorders, setPreOrders] = useState<VariantAggregate[]>([]);

    // const handleExport = () => {
    //     toast.success("Exporting...", {id:"exportToast"});
        

        
    //     // exportAsPDF(aggregates)
    // }

    function loadPreorders() {
		const aggregates = aggregateByVariants(orders)
		setPreOrders(() => aggregates)
	}

    useEffect(()=>{
        

        loadPreorders()
    },[])


    if(preorders.length < 1) return null;


    return <ExportAsPDF aggregates={preorders} />

    // return (
    //     <button
    //         onClick={handleExport}
    //         className="hover:text-primary"
    //         title="Export variant details"
    //     >
    //         <span className="sr-only">Export</span>
    //         <DownloadIcon className="h-4 w-4" />
    //     </button>
    // )
}