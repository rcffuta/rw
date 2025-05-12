import { prisma } from "../client";
import { PaymentStatus,OrderStatus } from "../generated/client";

type CreatePaymentInput = {
  reference: string;
  userId: number;
  amount: number;
  orderIds: number[];
};

export async function createPaymentWithOrders({
  reference,
  userId,
  amount,
  orderIds,
}: CreatePaymentInput) {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the payment
    const payment = await tx.payment.create({
      data: {
        reference,
        userId,
        amount,
        status: "pending",
      },
    });

    // 2. Attach orders to the payment
    await Promise.all(
      orderIds.map((orderId) =>
        tx.order.update({
          where: { id: orderId },
          data: {
            paymentId: payment.id,
          },
        })
      )
    );

    return payment;
  });
}
export async function verifyAndMarkPaymentAsPaid(reference: string) {
  try {
    const payment = await prisma.payment.update({
      where: { reference },
      data: {
        status: PaymentStatus.completed,
        paidAt: new Date(),
      },
      include: {
        orders: true,
      },
    });

    // Mark the associated order as paid
    await markOrdersAsPaid(payment.id);

    return payment;
  } catch (err) {
    console.error("Error updating payment status:", err);
    throw err;
  }
}

export async function markOrdersAsPaid(paymentId: number) {
    return await prisma.$transaction(async (tx) => {
        await tx.order.updateMany({
            where: { paymentId },
            data: { status: OrderStatus.paid },
        });

        // // 2. Delete or mark the payment
        // await tx.payment.update({
        // where: { id: paymentId },
        // data: {
        //     status: "failed",
        // },
        // });

        return { success: true };
    });
}

export async function markPaymentCompleted(paymentId: number) {
  return await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: PaymentStatus.completed,
      paidAt: new Date(),
    },
  });
}

export async function getPaymentWithOrders(paymentId: number) {
  return await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      orders: true,
    },
  });
}

export async function getOrdersByPaymentId(paymentId: number) {
  return await prisma.order.findMany({
    where: {
      paymentId,
    },
  });
}

export async function cancelPaymentAndUnlinkOrders(paymentId: number) {
  return await prisma.$transaction(async (tx) => {
    // 1. Unlink orders
    await tx.order.updateMany({
      where: { paymentId },
      data: { paymentId: null },
    });

    // 2. Delete or mark the payment
    await tx.payment.update({
      where: { id: paymentId },
      data: {
        status: "failed",
      },
    });

    return { success: true };
  });
}

export async function getUserPayments(userId: number) {
  return await prisma.payment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// export async function getUserPaymentsWithOrders(userId: number) {
//   return await prisma.payment.findMany({
//     where: {
//       userId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       orders: true,
//     },
//   });
// }

export async function getPaymentByReference(reference: string) {
  return await prisma.payment.findUnique({
    where: {
      reference,
    },
    include: {
      orders: true,
    },
  });
}
