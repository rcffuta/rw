import { CheckIcon, TrashIcon } from "@/components/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadIcon, PreviewIcon } from "../Tables/icons";
import EmptyRow from "../Tables/EmptyTable";
import { useFormatCurrency, wait } from "@gamezone/lib";
import { TableRowItem } from "../ui/types";
import { TableSkeleton } from "../ui/table-skeleton";
import clsx from "clsx";
import { OrderWithProductWithPayment } from "@gamezone/db";
import toast from "react-hot-toast";


type OrderType = OrderWithProductWithPayment;

type OrderProps = {
    orders: OrderType[];
};

const tableHead: TableRowItem[] = [
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
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <Table>
                {/* <TableHeader>
                    <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                        <TableHead className="min-w-[155px] xl:pl-7.5">
                            Package
                        </TableHead>
                        <TableHead>Invoice Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right xl:pr-7.5">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader> */}

                <TableHeader>
                    <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                        {tableHead.map((item, i) => (
                            <TableHead
                                key={i}
                                // className={clsx({
                                //     "!text-left": item.side === "left",
                                //     "!text-right": item.side === "right",
                                // })}
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
        </div>
    );
}


function RowItem({items}: {items: OrderType[]}) {
    const parseFigure = useFormatCurrency();
    return (
        <>
            {items.map((item, index)=>{
                return (
                    <TableRow
                        key={index}
                        className="border-[#eee] dark:border-dark-3"
                    >
                        <TableCell>
                            <h5 className="text-dark dark:text-white">
                                ORD-{item.id}
                            </h5>
                        </TableCell>

                        <TableCell className="min-w-[155px] text-dark dark:text-white xl:pl-7.5">
                            <p className="mt-[3px] text-body-sm font-medium">
                                {item.product.title}{" "}
                                {item.quantity > 1
                                    ? `(x${item.quantity})`
                                    : null}
                            </p>
                        </TableCell>

                        <TableCell>
                            <p className="text-dark dark:text-white">
                                {parseFigure(
                                    item.product.price * item.quantity,
                                )}
                            </p>
                        </TableCell>

                        <TableCell>
                            <p className="text-dark dark:text-white">
                                {item.payment?.reference}
                            </p>
                        </TableCell>

                        <TableCell>
                            <p className="text-dark dark:text-white">
                                {item.payment?.paidAt?.toDateString() || null}
                            </p>
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
                                    onClick={() => {
                                        toast.error("Not Implemented", {
                                            id: "notImplementedToast",
                                            duration: 1000,
                                        });
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

export function OrderTableSkeleton() {
    return (
        <TableSkeleton
            tableHeads={tableHead}
            title="Orders"
        />
    )
}

