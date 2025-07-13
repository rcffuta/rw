import { OrderList } from "@/components/Order/OrderList";
import { fetchOrders } from "@/utils/actionUtils";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrderPage() {
    const data = await fetchOrders();
    return <OrderList orders={data} />
};
