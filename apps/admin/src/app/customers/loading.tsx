import { CustomerTableHead } from '@/components/Customer/CustomerTable'
import TableLoader from '@/components/ui/TableLoader'

export default function Loading() {
	return <TableLoader tableHeads={CustomerTableHead} title="Loading customers..." rowCount={5} />
}
