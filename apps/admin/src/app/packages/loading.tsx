
import { productTableHeadings } from "@/components/Tables/ProductTable";
import TableLoader from "@/components/ui/TableLoader";

export default function Loading() {
    return (
        <TableLoader
            tableHeads={productTableHeadings}
            title="Loading products..."
        />
    )
}