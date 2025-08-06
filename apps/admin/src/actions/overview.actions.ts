// lib/dummyOverview.ts

import { fetchFulfilledOrders } from '@/utils/actionUtils'

// Dummy data generator
const generateDummyOverview = () => {
	const baseSales = Math.floor(Math.random() * 500) + 100 // 100-600 sales
	const baseRevenue = baseSales * (Math.random() * 5000 + 1000) // 1000-6000 per sale
	const baseUsers = Math.floor(baseSales * (Math.random() * 2 + 0.5)) // 0.5-2.5x sales

	return {
		sales: baseSales,
		revenue: Math.floor(baseRevenue),
		users: baseUsers,
		conversionRate: parseFloat((Math.random() * 0.3 + 0.1).toFixed(2)) // 10-40%
	}
}

// Track previous values to calculate growth
let previousData = generateDummyOverview()

let previousOverviewData: {
	sales: number
	revenue: number
	users: number
	conversionRate: number
} | null = null

export async function getOverviewData() {
	// Fetch all necessary data in parallel
	const orders = await fetchFulfilledOrders();

	// Calculate current metrics
	const currentSales = orders.length
	const currentRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

	// Estimate unique users from orders (replace with real user count if available)
	const uniqueUserIds = new Set(orders.map((order) => order.customer.email).filter(Boolean))
	const currentUsers = uniqueUserIds.size || 0// Fallback estimation

	// Calculate conversion rate (sales/users)
	const currentConversionRate =
		currentUsers > 0 ? parseFloat((currentSales / currentUsers).toFixed(2)) : 0

	// Calculate growth rates
	const calculateGrowth = (current: number, previous: number) => {
		if (!previous || previous === 0) return 0
		return parseFloat((((current - previous) / previous) * 100).toFixed(1))
	}

	const growthRates = previousOverviewData
		? {
				sales: calculateGrowth(currentSales, previousOverviewData.sales),
				revenue: calculateGrowth(currentRevenue, previousOverviewData.revenue),
				users: calculateGrowth(currentUsers, previousOverviewData.users),
				conversionRate: calculateGrowth(
					currentConversionRate,
					previousOverviewData.conversionRate
				)
			}
		: {
				sales: 0,
				revenue: 0,
				users: 0,
				conversionRate: 0
			}

	// Update previous data
	previousOverviewData = {
		sales: currentSales,
		revenue: currentRevenue,
		users: currentUsers,
		conversionRate: currentConversionRate
	}

	return {
		sales: {
			label: 'Total Sales',
			value: currentSales,
			growthRate: growthRates.sales
		},
		revenue: {
			label: 'Total Revenue',
			value: currentRevenue,
			growthRate: growthRates.revenue
		},
		users: {
			label: currentUsers === 1 ? 'Total Customer' : 'Total Customers',
			value: currentUsers,
			growthRate: growthRates.users
		},
		conversion: {
			label: 'Conversion Rate',
			value: currentConversionRate,
			growthRate: growthRates.conversionRate
		}
	}
}

// Dummy implementations of the original functions
export async function getTotalOrders() {
	const orders = await fetchFulfilledOrders()
	return orders.length
}

export async function getTotalRevenue() {
	const orders = await fetchFulfilledOrders()
	return orders.reduce((sum, order) => sum + order.totalAmount, 0)
}

export async function getTotalUsers() {
	const orders = await fetchFulfilledOrders()
	const uniqueUserIds = new Set(orders.map((order) => order.customer.userId).filter(Boolean))
	return uniqueUserIds.size
}

export async function getConversionRate(users?: number) {
	const totalOrders = await getTotalOrders()
	const totalUsers = users ?? (await getTotalUsers())

	if (totalUsers === 0) return 0
	return parseFloat((totalOrders / totalUsers).toFixed(2))
}
