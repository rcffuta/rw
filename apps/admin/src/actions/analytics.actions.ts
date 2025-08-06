// lib/dummyStats.ts
import { MerchPackageRecord, OrderStatus, ProductRecord } from '@rcffuta/ict-lib'
import { fetchFulfilledOrders, fetchPackages, fetchProducts } from '@/utils/actionUtils'
import { formatOrderStatus } from '@/utils/orderUtils'
import { StockMap, StockSale } from '@/types/analytics.types'
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


export async function fetchTopSellingProducts(limit: number = 11): Promise<StockSale[]> {
	const orders = await fetchFulfilledOrders();
	const products = await fetchProducts();
	const packages = await fetchPackages();

	const salesMap = new Map<string, StockMap>();
	
	orders.forEach((order) => {
		console.debug("Orders:", {orders: order.items})
		order.items.forEach((item) => {
			
			if (item.itemType === "product") {
				const product = products.find((p) => {
					const id = p.id.replace(/-/g, "").slice(0, 24);
					return id === item.itemId
				});
				if (!product) {
					console.debug("Found NOne", {item})
					return;
				};

				const cached = salesMap.get(item.itemId);
				salesMap.set(item.itemId, {
					unitsSold: (cached?.unitsSold || 0) + item.quantity,
					revenue: (cached?.revenue || 0) + item.quantity * item.price,
					id: item.itemId,
					image: item.variant.image,
					name: product.name,
					price: item.price
				});
			} else if (item.itemType === "package") {
				const matchedPackage = packages.find((pkg) => {
					const id = pkg.id.replace(/-/g, "").slice(0, 24);
					return id === item.itemId
				});
				if (!matchedPackage) return;

				matchedPackage.items.forEach((pkgItem) => {
					const cached = salesMap.get(pkgItem.productId);
					salesMap.set(pkgItem.productId, {
						unitsSold: (cached?.unitsSold || 0) + item.quantity * pkgItem.quantity,
						revenue: (cached?.revenue || 0) + item.quantity * pkgItem.quantity * pkgItem.price,
						id: item.itemId,
						image: matchedPackage.image,
						name: matchedPackage.name,
						price: item.price
					});
				});
			}
		});
	});

	const productSales: StockSale[] = Array.from(salesMap.values())
		// .map((stock) => {
		// 	const sales = salesMap.get(product.id);
		// 	return {
		// 		...product,
		// 		unitsSold: sales?.unitsSold || 0,
		// 		revenue: sales?.revenue || 0,
		// 	};
		// })
		// .filter((e) => e.unitsSold >= 1)
		.sort((a, b) => b.unitsSold - a.unitsSold)
		.slice(0, limit)
		.map((stock, index) => {

			return {
				...stock,
				rank: index + 1,
			}
		});

	console.debug("Sales", JSON.stringify({ productSales, salesMap, }, null, 2));

	return productSales;
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
