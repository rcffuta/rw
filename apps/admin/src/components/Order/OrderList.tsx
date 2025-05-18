"use client";

import { OrderTable, OrderTableSkeleton } from "./OrderTable";
import EmptyRow from "../Tables/EmptyTable";
import { useEffect, useState } from "react";
import { OrderWithProductWithPayment } from "@willo/db";
import { loadAllPaidOrder } from "@/actions/order.action";

export function OrderList() {

    const [loading, setLoading] = useState(true);
    const [orders, setOrder] = useState<OrderWithProductWithPayment[]>([]);

    useEffect(()=>{
        async function loadOrder() {
            const data = await loadAllPaidOrder();

            setOrder(()=>data);
            setLoading(false);

        }

        if(loading) loadOrder();
    },[loading]);

    if (loading) return <OrderTableSkeleton />;

    if (orders.length < 1) return <EmptyRow/>;

    return (
        <OrderTable orders={orders} />
    );
}