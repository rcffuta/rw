"use client";

import { OrderTable } from "./OrderTable";
import EmptyRow from "../Tables/EmptyTable";
import { useEffect, useState } from "react";
import { loadAllPaidOrder } from "@/actions/order.action";
import { Order } from "@rcffuta/ict-lib";


type Props = {
    orders: Order[];
}

export function OrderList({orders}: Props) {

    // const [loading, setLoading] = useState(true);
    // const [orders, setOrder] = useState<any[]>([]);

    // useEffect(()=>{
    //     async function loadOrder() {
    //         const data = await loadAllPaidOrder();

    //         setOrder(()=>data);
    //         setLoading(false);

    //     }

    //     if(loading) loadOrder();
    // },[loading]);

    let template;

    if (orders.length < 1) template = <EmptyRow description="Orders will show here when customers make orders"/>;

    else template = <OrderTable orders={orders} />

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            {template}
        </div>
    );
}