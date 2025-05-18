import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/utils";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import clsx from "clsx";
import { slugify } from "@/utils/format-text";
import { TableRowItem } from "../ui/types";
import { fetchTopSellingProducts } from "@/actions/analytics.actions";
import { CategoryImage, formatCurrency } from "@willo/lib";

const TableHeads: TableRowItem[] = [
    { label: "Rank" },
    {
        label: "Product",
        // side: "left",
    },
    { label: "Units Sold" },
    { label: "Revenue" },
];

const TableLabel = "Top Sales";

export async function TopSellingProducts({ className }: { className?: string }) {
  const data = await fetchTopSellingProducts();

  if (data.length < 1) return null;

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
                                  "min-w-[120px]": i === 1,
                              })}
                          >
                              {item.label}
                          </TableHead>
                      ))}
                  </TableRow>
              </TableHeader>

              <TableBody>
                  {data.map((item, i) => (
                      <TableRow
                          className="text-center text-base font-medium text-dark dark:text-white"
                          key={slugify(item.name) + i}
                      >
                          <TableCell className="text-center">
                              {item.rank}
                          </TableCell>

                          <TableCell className="flex min-w-fit items-center justify-center gap-3">
                              <CategoryImage
                                  src={item.images.at(0)}
                                  className="size-10 rounded-full object-cover"
                                  // width={40}
                                  // height={40}
                                  alt={item.name + " Thumbmail"}
                                  // role="presentation"
                              />
                              <div className="">{item.name}</div>
                          </TableCell>

                          <TableCell className="text-center">
                              {item.unitsSold}
                          </TableCell>

                          <TableCell className="text-green-light-1 text-center">
                              {formatCurrency(item.revenue)}
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