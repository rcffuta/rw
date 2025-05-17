
import Image from "next/image";
import { TableRowItem } from "../ui/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ProductItem as Product } from "@gamezone/db";
import { TableSkeleton } from "../ui/table-skeleton";

import { formatTimeFromNow } from "@/utils/format-time";
import { standardFormat } from "@/utils/format-number";
import { formatCurrency } from "@gamezone/lib";

const tableHeads: TableRowItem[] = [
    {
        label: "Thumbmail",
        // side: "left",
    },
    {
        label: "Item",
        // side: "left",
    },
    { label: "Price" },
    { label: "Discount Price" },
    // { label: "Last Updated" },
    { label: "Date Created" },
    // { label: "Sales" },
    // { label: "Profit" },
];

const TableLabel = "Preparing table...";


type ProductListProps = {
    title: string;
    products: Product[];
};

export function ProductTable(props: ProductListProps) {
    const { title, products } = props;

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            {/* <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
                <h2 className="text-2xl font-bold text-dark dark:text-white">
                    {title}
                </h2>
            </div> */}

            <Table>
                <TableHeader>
                    <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                        {tableHeads.map((item, i) => (
                            <TableHead
                                key={i}
                                className="text-center"
                                // className={clsx(
                                //     {
                                //         "!text-left": item.side === "left",
                                //         "!text-right": item.side === "right",
                                //         "min-w-[120px]": i === 0,
                                //     },
                                //     item.className,
                                // )}
                            >
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            className="text-base font-medium text-dark-2 dark:text-white"
                            key={product.id}
                        >
                            <TableCell className="flex items-center justify-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                                <Image
                                    src={
                                        product.images.at(0) ??
                                        "/logos/github.svg"
                                    }
                                    className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                                    width={60}
                                    height={50}
                                    alt={"Image for product " + product.title}
                                    role="presentation"
                                />
                            </TableCell>

                            <TableCell className="text-center">
                                {product.title}
                            </TableCell>

                            <TableCell className="text-center">
                                {formatCurrency(product.price)}
                            </TableCell>

                            <TableCell className="text-center">
                                {formatCurrency(product.discountedPrice)}
                            </TableCell>

                            <TableCell className="text-center">
                                {/* {dayjs(product.createdAt.toDateString())} */}
                                {/* {dayjs(item.date).format("MMM DD, YYYY")} */}
                                {formatTimeFromNow(product.createdAt)}
                            </TableCell>

                            {/* <TableCell className="pr-5 text-right text-green-light-1 sm:pr-6 xl:pr-7.5">
                                ${product.profit}
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function ProductTableSkeleton() {
    return (
        <div className="max-w-[750px] mx-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <TableSkeleton title={TableLabel} tableHeads={tableHeads} />
        </div>
    );
}
