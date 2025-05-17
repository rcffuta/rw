import { OrderList } from "@/components/Order/OrderList";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrderPage() {
    return <OrderList />;
};
