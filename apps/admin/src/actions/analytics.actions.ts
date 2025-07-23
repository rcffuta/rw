// lib/dummyStats.ts
import { OrderStatus } from '@rcffuta/ict-lib'
import { fetchFulfilledOrders, fetchProducts } from '@/utils/actionUtils'
import { formatOrderStatus } from '@/utils/orderUtils'
type StatTimeFrame = any

const monthLabels = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Helper to generate random amounts between min and max
const randomAmount = (min: number, max: number) =>
	parseFloat((Math.random() * (max - min) + min).toFixed(2))

export type WeekStat = 'last week' | 'this week'

// Refactored functions with dummy implementations
export async function getPaymentStatsChart(timeFrame: StatTimeFrame) {
	// const raw = generateDummyPaymentData(timeFrame);
	const orders = await fetchFulfilledOrders()

	const yearlyStats = Array.from({ length: 12 }, (_, i) => {
		const month = i + 1
		const monthOrders = orders.filter((order) => {
			const orderDate = new Date(order.createdAt)
			return orderDate.getMonth() + 1 === month
		})

		const received = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
		const due = monthOrders
			.filter((order) => (order.status === 'pending' || (order.status === "cart" && Boolean(order.paymentRef))))
			.reduce((sum, order) => sum + order.totalAmount, 0)

		return {
			period: month.toString().padStart(2, '0'),
			received,
			due
		}
	})

	return {
		received: yearlyStats.map((r) => ({ x: parseInt(r.period), y: r.received })),
		due: yearlyStats.map((r) => ({ x: parseInt(r.period), y: r.due }))
	}

	// if (timeFrame === 'yearly') {
		
	// } else {
	// 	// Monthly implementation (last 30 days)
	// 	const monthlyStats = Array.from({ length: 12 }, (_, i) => {
	// 		const monthOrders = orders.filter((order) => {
	// 			const orderDate = new Date(order.createdAt)
	// 			const daysDiff = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
	// 			return daysDiff <= 30
	// 		})

	// 		const received = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
	// 		const due = monthOrders
	// 			.filter((order) => order.status === 'pending')
	// 			.reduce((sum, order) => sum + order.totalAmount, 0)

	// 		return {
	// 			period: (i + 1).toString().padStart(2, '0'),
	// 			received,
	// 			due
	// 		}
	// 	})

	// 	return {
	// 		received: monthLabels.map((label, i) => ({
	// 			x: label,
	// 			y: monthlyStats[i]?.received || 0
	// 		})),
	// 		due: monthLabels.map((label, i) => ({
	// 			x: label,
	// 			y: monthlyStats[i]?.due || 0
	// 		}))
	// 	}
	// }
}

export async function getWeeklyStats(timeFrame: StatTimeFrame = 'this week') {
	const orders = await fetchFulfilledOrders()

	const now = new Date()
	const currentDay = now.getDay()
	const currentDate = now.getDate()

	const weeklyStats = dayNames.map((_, i) => {
		const dayDiff = currentDay - i
		const targetDate = new Date(now)
		targetDate.setDate(currentDate - dayDiff)

		const dayOrders = orders.filter((order) => {
			const orderDate = new Date(order.createdAt)
			return (
				orderDate.getDate() === targetDate.getDate() &&
				orderDate.getMonth() === targetDate.getMonth() &&
				orderDate.getFullYear() === targetDate.getFullYear()
			)
		})

		const sales = dayOrders.length
		const revenue = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0)

		return {
			dow: i,
			sales,
			revenue
		}
	})

	return {
		sales: dayNames.map((day, i) => ({
			x: day,
			y: weeklyStats[i]?.sales || 0
		})),
		revenue: dayNames.map((day, i) => ({
			x: day,
			y: weeklyStats[i]?.revenue || 0
		}))
	}
}

export async function fetchTopSellingProducts(limit: number = 10) {
	const orders = await fetchFulfilledOrders()
	const products = await fetchProducts()

	const productSales = products.map((product) => {
		const productOrders = orders.flatMap((order) => {

			if (order.items.find(e=>e.itemId === product.id)) {
				return order;
			}else {
				return [];
			}
		});

		const unitsSold = productOrders.reduce((sum, item) => {
			const qty = item.items.reduce((acc, each)=>{
				return acc + each.quantity
			}, 0);
			return sum + qty
		}, 0)

		const revenue = productOrders.reduce((sum, item) => {
			const qty = item.items.reduce((acc, each)=>{
				return acc + (each.price * each.quantity)
			}, 0);
			return sum + qty
		}, 0)

		return {
			...product,
			unitsSold,
			revenue
		}
	})

	return productSales
		.filter((e)=>e.unitsSold >= 1)
		.sort((a, b) => b.unitsSold - a.unitsSold)
		.slice(0, limit)
		.map((product, index) => ({
			rank: index + 1,
			id: product.id,
			name: product.name,
			image: product.variants.at(0)?.image,
			unitsSold: product.unitsSold,
			revenue: product.revenue
		}))
}

export async function fetchOrderStatusStats() {
	const orders = await fetchFulfilledOrders()

	const statusCounts = orders.reduce(
		(acc, order) => {
			acc[order.status] = (acc[order.status] || 0) + 1
			return acc
		},
		{} as Record<OrderStatus, number>
	)

	return Object.entries(statusCounts).map(([status, count]) => ({
		label: formatOrderStatus(status as OrderStatus),
		value: count
	}))
}
