import { CustomerList } from '@/components/Customer/CustomerList'
import { OrderList } from '@/components/Order/OrderList'
import { fetchOrders, groupOrdersByCustomer } from '@/utils/actionUtils'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: 'Customers'
}

export default async function OrderPage() {
	const data = await groupOrdersByCustomer()
	return <CustomerList orders={data}/>
}
