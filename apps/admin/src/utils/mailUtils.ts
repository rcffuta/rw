import {getMerchDeliveryMail, getMerchPickupMail, getMerchProcessingMail, MerchDeliveryEmailProps, OrderRecord, sendMail} from "@rcffuta/ict-lib"

function parseOrderInfo(order: OrderRecord, deliveryInfo?: MerchDeliveryEmailProps["order"]["deliveryInfo"]): MerchDeliveryEmailProps {
  return {
    customer: {
      name: order.customer.name,
    },
    order: {
      item: {
        name: order.item.name,
        quantity: order.item.quantity.toString(),
      },
      totalAmount: order.totalAmount,
      deliveryInfo: {
        deliveryDate: deliveryInfo?.deliveryDate || new Date().toISOString(),
        phoneNumber: deliveryInfo?.phoneNumber
      }      
    },
    repContact: "08122137834",
  }
}

export async function sendShippingNotification(order: OrderRecord) {
    
    const data = parseOrderInfo(order);

    const email = "preciousolusola16@gmail.com" // order.customer.email

    const mailParams = await getMerchProcessingMail(data);

    const isSent = await sendMail({
        ...mailParams,
        email
    })


    if (!isSent) {
        throw new Error("Could not send notification to:" + email);
    }
}


export async function sendPickupNotification(order: OrderRecord) {
  const data = parseOrderInfo(order);

    const email = "preciousolusola16@gmail.com" // order.customer.email

    const mailParams = await getMerchPickupMail(data);

    const isSent = await sendMail({
        ...mailParams,
        email
    })


    if (!isSent) {
        throw new Error("Could not send notification to:" + email);
    }
}

export async function sendDeliveryNotification(order: OrderRecord) {
    const data = parseOrderInfo(order);

    const email = "preciousolusola16@gmail.com" // order.customer.email

    const mailParams = await getMerchDeliveryMail(data);

    const isSent = await sendMail({
        ...mailParams,
        email
    })


    if (!isSent) {
        throw new Error("Could not send notification to:" + email);
    }
}