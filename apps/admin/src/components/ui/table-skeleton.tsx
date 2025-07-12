import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { TableRowItem } from "./types";


export type TableSkeletonProps = {
  title: string;
  tableHeads: TableRowItem[];
  rowCount?:number;
};

export function TableSkeleton(props: TableSkeletonProps) {
    return (
        <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h2 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
                {props.title}
            </h2>

            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        {props.tableHeads.map((item, i) => (
                            <TableHead
                                key={i}
                                className={clsx({
                                    '!text-left': item.side === 'left',
                                    '!text-right': item.side === 'right'
                                })}
                            >
                                {item.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: props.rowCount || props.tableHeads.length }).map(
                        (_, i) => (
                            <TableRow key={i}>
                                <TableCell colSpan={100}>
                                    <Skeleton className="h-8" />
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
