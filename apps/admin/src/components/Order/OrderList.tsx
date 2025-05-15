"use client";

import { useSession } from "@gamezone/lib";
import { OrderTable, OrderTableSkeleton } from "./OrderTable";
import EmptyRow from "../Tables/EmptyTable";
import { useEffect, useState } from "react";
import { OrderWithProductWithPayment } from "@gamezone/db";
import { loadAllPaidOrder } from "@/actions/order.actions";
// import { TableSkeleton } from "../ui/table-skeleton";
// import { ProductTableSkeleton } from "../Tables/ProductList";



export function OrderList() {
    const user = useSession();
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



    if (!user) return <EmptyRow />;

    if (loading) return <OrderTableSkeleton />;

    return (
        <OrderTable userId={user.id} orders={orders} />
    );
}