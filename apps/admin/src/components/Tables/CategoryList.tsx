
import { TableRowItem } from "../ui/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { TableSkeleton } from "../ui/table-skeleton";

import { compactFormat } from "@/utils/format-number";
import { CategoryImage } from "@willo/lib";

const tableHeads: TableRowItem[] = [
    {
        label: "Thumbmail",
        // side: "left",
    },
    {
        label: "Category",
        // side: "left",
    },
    { label: "Total Products" },
    // { label: "Discount Price" },
    // { label: "Last Updated" },
    // { label: "Date Created" },
    // { label: "Sales" },
    // { label: "Profit" },
];

const TableLabel = "Top Sales";


type Props = {
    title: string;
    categories: FullCategory[];
};

export function CategoryTable(props: Props) {
    const { title, categories } = props;

    return (
        <div className="max-w-[750px] mx-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
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
                            >
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => (
                        <TableRow
                            className="text-base font-medium text-dark-2 dark:text-white"
                            key={category.id}
                        >
                            {/* <TableCell className="flex items-center justify-center"> */}
                            <TableCell className="flex items-center justify-center">
                                <CategoryImage
                                    src={category.image}
                                    className="aspect-[6/5] w-15 rounded-[5px]"
                                    alt={"Image for category " + category.name}
                                />
                            </TableCell>

                            {/* <TableCell className="flex items-center justify-center gap-3 pl-5 sm:pl-6 xl:pl-7.5"> */}
                            <TableCell className="text-center">
                                <div>{category.name}</div>
                            </TableCell>

                            {/* <TableCell>{product.price}</TableCell> */}

                            <TableCell className="text-center">
                                {compactFormat(category.products.length)}
                            </TableCell>

                            {/* <TableCell className="text-center"> */}
                                {/* {dayjs(product.createdAt.toDateString())} */}
                                {/* {dayjs(item.date).format("MMM DD, YYYY")} */}
                                {/* {formatTimeFromNow(category.)} */}
                            {/* </TableCell> */}

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

export function CategoryTableSkeleton() {
    return <TableSkeleton title={TableLabel} tableHeads={tableHeads} />;
}
