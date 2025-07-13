import { OrderTableHead } from "@/components/Order/OrderTable";
import TableLoader from "@/components/ui/TableLoader";

export default function Loading() {
    return (
        <TableLoader
            tableHeads={OrderTableHead}
            title="Loading Orders..."
            rowCount={5}
        />
    )
}