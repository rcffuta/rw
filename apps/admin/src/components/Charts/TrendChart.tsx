import { cn } from '@/utils/utils'
import { DonutChart } from './chart-items'
import { fetchOrderStatusStats } from '@/actions/analytics.actions'
import { Info } from 'lucide-react'
import { OrderStatus } from '@rcffuta/ict-lib'

type PropsType = {
	className?: string
	timeFrame?: 'weekly' | 'monthly' | 'yearly'
}


const statusColorArray: Record<OrderStatus, string> = {
	cart: '#F59E0B',
	pending: '#EF4444',
	paid: '#10B981',
	shipped: '#3B82F6',
	delivered: '#8B5CF6',
	cancelled: '#64748B'
}


export async function TrendChart({ className, timeFrame = 'monthly' }: PropsType) {
	const data = await fetchOrderStatusStats()

	return (
		<div
			className={cn(
				'rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-dark',
				'flex flex-col',
				className
			)}
		>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
						Order Status Distribution
					</h2>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Breakdown of orders by current status
					</p>
				</div>

				{data.length > 0 && (
					<div className="flex items-center gap-2">
						<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
							Timeframe:
						</span>
						<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
							{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
						</span>
					</div>
				)}
			</div>

			{data.length > 0 ? (
				<div className="flex flex-1 items-center justify-center">
					<DonutChart
						data={data}
						title="Order Status"
						colors={Object.values(statusColorArray)}
					/>
				</div>
			) : (
				<div className="flex h-[300px] flex-col items-center justify-center space-y-4">
					<div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
						<Info className="h-6 w-6 text-gray-400 dark:text-gray-500" />
					</div>
					<div className="text-center">
						<h3 className="text-lg font-medium text-gray-900 dark:text-white">
							No orders yet
						</h3>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Order status distribution will appear here once orders are placed
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
