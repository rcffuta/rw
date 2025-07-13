// lib/dummyStats.ts
import { OrderStatus } from '@rcffuta/ict-lib'
import { fetchOrders, fetchProducts, formatOrderStatus } from '@/utils/actionUtils'
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

// Dummy payment data generator
const generateDummyPaymentData = (timeFrame: any) => {
	if (timeFrame === 'yearly') {
		return Array.from({ length: 12 }, (_, i) => ({
			period: (i + 1).toString().padStart(2, '0'),
			received: randomAmount(5000, 20000),
			due: randomAmount(1000, 5000)
		}))
	} else {
		return Array.from({ length: 12 }, (_, i) => ({
			period: (i + 1).toString().padStart(2, '0'),
			received: randomAmount(1000, 5000),
			due: randomAmount(200, 1000)
		}))
	}
}

// Dummy weekly stats generator
const generateDummyWeeklyStats = () => {
	return dayNames.map((_, i) => ({
		dow: i,
		sales: Math.floor(Math.random() * 50) + 10,
		revenue: parseFloat((Math.random() * 5000 + 1000).toFixed(2))
	}))
}

// Dummy top products generator
const generateDummyTopProducts = (limit: number) => {
	const products = [
		'Anniversary T-Shirt',
		'RCF Hoodie',
		'Bible Cover',
		'Wristband',
		'Cap',
		'Notebook',
		'Pen Set'
	]

	return Array.from({ length: limit }, (_, i) => ({
		id: `prod_${1000 + i}`,
		title: products[i % products.length],
		images: [`/products/product-${(i % 7) + 1}.jpg`],
		totalsold: Math.floor(Math.random() * 100) + 20,
		totalrevenue: randomAmount(500, 5000)
	}))
}

// Dummy order status stats
const generateDummyOrderStats = () => {
	const statuses = ['paid', 'disbursed', 'cart', 'pending']
	return statuses.map((status) => ({
		status,
		count: Math.floor(Math.random() * 50) + 10
	}))
}

// Refactored functions with dummy implementations
export async function getPaymentStatsChart(timeFrame: StatTimeFrame) {
	// const raw = generateDummyPaymentData(timeFrame);
	const orders = await fetchOrders()

	if (timeFrame === 'yearly') {
		const yearlyStats = Array.from({ length: 12 }, (_, i) => {
			const month = i + 1
			const monthOrders = orders.filter((order) => {
				const orderDate = new Date(order.createdAt)
				return orderDate.getMonth() + 1 === month
			})

			const received = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
			const due = monthOrders
				.filter((order) => order.status === 'pending')
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
	} else {
		// Monthly implementation (last 30 days)
		const monthlyStats = Array.from({ length: 12 }, (_, i) => {
			const monthOrders = orders.filter((order) => {
				const orderDate = new Date(order.createdAt)
				const daysDiff = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
				return daysDiff <= 30
			})

			const received = monthOrders.reduce((sum, order) => sum + order.totalAmount, 0)
			const due = monthOrders
				.filter((order) => order.status === 'pending')
				.reduce((sum, order) => sum + order.totalAmount, 0)

			return {
				period: (i + 1).toString().padStart(2, '0'),
				received,
				due
			}
		})

		return {
			received: monthLabels.map((label, i) => ({
				x: label,
				y: monthlyStats[i]?.received || 0
			})),
			due: monthLabels.map((label, i) => ({
				x: label,
				y: monthlyStats[i]?.due || 0
			}))
		}
	}
}

export async function getWeeklyStats(timeFrame: StatTimeFrame = 'this week') {
	const orders = await fetchOrders()

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
	const orders = await fetchOrders()
	const products = await fetchProducts()

	const productSales = products.map((product) => {
		const productOrders = orders.flatMap((order) =>
			order.items.filter((item) => item.itemType === 'product' && item.itemId === product.id)
		)

		const unitsSold = productOrders.reduce((sum, item) => sum + item.quantity, 0)
		const revenue = productOrders.reduce((sum, item) => sum + item.price * item.quantity, 0)

		return {
			...product,
			unitsSold,
			revenue
		}
	})

	return productSales
		.sort((a, b) => b.unitsSold - a.unitsSold)
		.slice(0, limit)
		.map((product, index) => ({
			rank: index + 1,
			id: product.id,
			name: product.name,
			images: product.images,
			unitsSold: product.unitsSold,
			revenue: product.revenue
		}))
}

export async function fetchOrderStatusStats() {
	const orders = await fetchOrders()

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
