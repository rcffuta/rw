import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat, standardFormat } from "@/utils/format-number";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { TableSkeleton, TableSkeletonHead } from "@/components/ui/table-skeleton";
import clsx from "clsx";
import { getTopChannels, getTopProducts } from "@/actions/analytics.action";
import { slugify } from "@/utils/format-text";

const TableHeads: TableSkeletonHead[] = [
  {
    label: "Source",
    side: "left",
  },
  { label: "Category" },
  { label: "Price"},
  { label: "Sales" },
  { label: "Profit" },
];

const TableLabel = "Top Sales";

export async function TopSellingProducts({ className }: { className?: string }) {
  const data = await getTopProducts();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Top Selling Products
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            {TableHeads.map((item, i) => (
              <TableHead
                key={i}
                className={clsx({
                  "!text-left": item.side === "left",
                  "!text-right": item.side === "right",
                  "min-w-[120px]": i === 0,
                })}
              >
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product, i) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={slugify(product.name) + i}
            >
              <TableCell className="flex min-w-fit items-center gap-3">
                <Image
                  src={product.image}
                  className="size-8 rounded-full object-cover"
                  width={40}
                  height={40}
                  alt={product.name + " Thumbmail"}
                  role="presentation"
                />
                <div className="">{product.name}</div>
              </TableCell>

              <TableCell>{product.category}</TableCell>

              <TableCell>${standardFormat(product.price)}</TableCell>

              <TableCell className="">
                {compactFormat(product.sold)}
              </TableCell>

              <TableCell className="text-green-light-1">
                ${standardFormat(product.profit)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const TopSellingProductsSkeleton = () => {
  return <TableSkeleton title={TableLabel} tableHeads={TableHeads} />;
};