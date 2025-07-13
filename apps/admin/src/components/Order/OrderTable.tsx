"use client";

import { CheckIcon } from "@/components/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, useNavigate} from "@willo/lib";
import { TableRowItem } from "../ui/types";
import { TableSkeleton } from "../ui/table-skeleton";
import clsx from "clsx";
import toast from "react-hot-toast";
import { sendProductToCustomer } from "@/actions/order.action";
import { Order, OrderItem, OrderRecord } from "@rcffuta/ict-lib";


type OrderType = any

type OrderProps = {
    orders: OrderType[]
}

export const OrderTableHead: TableRowItem[] = [
    {
        label: "OrderId",
    },
    {
        label: "Product",
    },
    {
        label: "Amount",
    },
    {
        label: "Payment Reference",
    },
    {
        label: "Payment Date",
    },
    {
        label: "Status",
    },
    {
        label: "Action",
    },
];

export function OrderTable({ orders}: OrderProps) {


    return (
    
        <Table>

            <TableHeader>
                <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                    {OrderTableHead.map((item, i) => (
                        <TableHead
                            key={i}
                            className="text-center"
                        >
                            {item.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                <RowItem items={orders} />
            </TableBody>
        </Table>
    );
}


function RowItem({items}: {items: OrderType[]}) {
    const {navigate} = useNavigate();
    return (
        <>
            {items.map((item, index)=>{
                const orderId = `ORD-${item.id}`;
                return (
                    <TableRow
                        key={index}
                        className="border-[#eee] dark:border-dark-3"
                    >
                        <TableCell className="text-center">
                            <h5 className="text-dark dark:text-white">
                                {orderId}
                            </h5>
                        </TableCell>

                        <TableCell className="min-w-[155px] text-center text-dark dark:text-white xl:pl-7.5">
                            <p className="mt-[3px] text-body-sm font-medium">
                                {item.product.title}{" "}
                                {item.quantity > 1
                                    ? `(x${item.quantity})`
                                    : null}
                            </p>
                        </TableCell>

                        <TableCell className="text-center font-mono font-semibold text-dark dark:text-white">
                            {formatCurrency(item.product.price * item.quantity)}
                        </TableCell>

                        <TableCell className="text-center text-dark dark:text-white">
                            {item.payment?.reference}
                        </TableCell>

                        <TableCell className="text-center text-dark dark:text-white">
                            {item.payment?.paidAt?.toDateString() || null}
                        </TableCell>

                        <TableCell>
                            <div
                                className={clsx(
                                    "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                                    {
                                        "bg-[#219653]/[0.08] text-[#219653]":
                                            item.status === "disbursed",
                                        "bg-[#D34053]/[0.08] text-[#D34053]":
                                            item.status === "cancelled",
                                        "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                                            item.status === "paid",
                                        "bg-[#FFA70B]/[0.08] text-gray-6":
                                            item.status === "cart",
                                    },
                                )}
                            >
                                {item.status}
                            </div>
                        </TableCell>

                        <TableCell className="xl:pr-7.5">
                            <div className="flex items-center justify-end gap-x-3.5">
                                <button
                                    className="hover:text-primary"
                                    onClick={async () => {
                                        // toast.error("Not Implemented", {
                                        //     id: "notImplementedToast",
                                        //     duration: 1000,
                                        // });

                                        const toastId = "disburseToast";

                                        toast.loading("Disbursing", {
                                            id: toastId,
                                        });

                                        const { product, user, ...order } = item;

                                        const {success, message="", data} =
                                            await sendProductToCustomer(
                                                order,
                                                user,
                                                product,
                                            );

                                        if (!success) {
                                            toast.error(
                                                message,
                                                {
                                                    id: toastId,
                                                },
                                            );
                                        } else {
                                            toast.success(
                                                message,
                                                {
                                                    id: toastId,
                                                },
                                            );


                                            if (data?.redirect) {
                                                navigate(data.redirect, {replace: true});
                                            }

                                        }
                                    }}
                                >
                                    <span className="sr-only">Disburse</span>
                                    <CheckIcon />
                                    {/* <TrashIcon /> */}
                                </button>

                                {/* <button className="hover:text-primary">
                                    <span className="sr-only">
                                        Delete Invoice
                                    </span>
                                    <TrashIcon />
                                </button>

                                <button className="hover:text-primary">
                                    <span className="sr-only">
                                        Download Invoice
                                    </span>
                                    <DownloadIcon />
                                </button> */}
                            </div>
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    )
}

// export function OrderTableSkeleton() {
//     return (
//         <TableSkeleton
//             tableHeads={tableHead}
//             title="Orders"
//         />
//     )
// }

