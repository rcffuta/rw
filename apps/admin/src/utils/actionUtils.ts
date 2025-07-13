"use server";

import {
	getOrders,
	getProducts,
	findUnderGraduates,
	getPackages,
} from '@rcffuta/ict-lib'
import { mockOrders } from './orderUtils';

export async function fetchOrders() {
	const { data = [] } = await getOrders()

	return data ?? []
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

