"use server";

import {
	getOrders,
	getProducts,
	findUnderGraduates,
	getPackages,
	OrderStatus,
} from '@rcffuta/ict-lib'
import { mockOrders } from './orderUtils';

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

