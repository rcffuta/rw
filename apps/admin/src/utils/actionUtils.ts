"use server";

import {
	getOrders,
	getProducts,
	findUnderGraduates,
	getPackages,
	OrderStatus,
	OrderRecord,
	CustomerInfo,
} from '@rcffuta/ict-lib'
import { mockOrders } from './orderUtils';
import { GroupedOrdersByCustomer } from '@/types/analytics.types';

export async function fetchOrders() {
	const { data = [] } = await getOrders()

	return data ?? []
	// return mockOrders
}

export async function fetchFulfilledOrders() {
	const blacklist: OrderStatus[] = ["cancelled"]
	const data = await fetchOrders()

	return data.filter(e=>{
		if (e.status === "cart") {
			return Boolean(e.paymentRef);
		}
		return !blacklist.includes(e.status)
	})
	// return mockOrders
}

export async function fetchPendingOrders() {
	const data = await fetchOrders()

	return data.filter(e=>{
		return e.status === "pending";
	})
	// return mockOrders
}

export async function fetchProducts() {
	const { data = [] } = await getProducts()

	return data ?? []
}

export async function fetchPackages() {
	const { data = [] } = await getPackages()

	return data ?? []
}

export async function fetchMembers() {
	const { data = [] } = await findUnderGraduates()

	return data ?? []
}


export async function groupOrdersByCustomer(): Promise<GroupedOrdersByCustomer[]> {	
	const map = new Map<string, GroupedOrdersByCustomer>();
	const orders = await fetchOrders();

  for (const order of orders) {
    const customerId = order.customer.email;

    if (!map.has(customerId)) {
      map.set(customerId, {
        customer: order.customer,
		id: order.customer.email,
        orders: [],
		amount: order.totalAmount
      });
    }

    map.get(customerId)!.orders.push(order);
  }

  return Array.from(map.values());
}
