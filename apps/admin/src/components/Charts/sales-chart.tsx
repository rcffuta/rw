import { PeriodPicker } from '@/components/period-picker'
import { standardFormat } from '@/utils/format-number'
import { cn } from '@/utils/utils'
import { getPaymentStatsChart, getWeeklyStats, WeekStat } from '@/actions/analytics.actions'
import { AreaChart, BarChart } from './chart-items'
import { formatCurrency } from '../../../../../packages/shared'

type StatTimeFrame = any
type PropsType = {
	timeFrame?: StatTimeFrame
	className?: string
}

export async function SalesOverview({ timeFrame = 'monthly', className }: PropsType) {
	const data = await getPaymentStatsChart(timeFrame)

	return (
		<div
			className={cn(
				'grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card',
				className
			)}
		>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="text-body-2xlg font-bold text-dark dark:text-white">
					Sales Overview
				</h2>

				<PeriodPicker defaultValue={timeFrame} sectionKey="payments_overview" />
			</div>

			<AreaChart data={data} />

			<dl className="grid divide-stroke text-center dark:divide-dark-3 sm:grid-cols-2 sm:divide-x [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1">
				<div className="dark:border-dark-3 max-sm:mb-3 max-sm:border-b max-sm:pb-3">
					<dt className="text-xl font-bold text-dark dark:text-white">
						{/* $ */}
						{formatCurrency(data.received.reduce((acc, { y }) => acc + y, 0))}
					</dt>
					<dd className="font-medium dark:text-dark-6">Received Amount</dd>
				</div>

				<div>
					<dt className="text-xl font-bold text-dark dark:text-white">
						{/* $ */}
						{formatCurrency(data.due.reduce((acc, { y }) => acc + y, 0))}
					</dt>
					<dd className="font-medium dark:text-dark-6">Due Amount</dd>
				</div>
			</dl>
		</div>
	)
}

export async function SalesWeeksProfit({
	className,
	timeFrame
}: {
	className?: string
	timeFrame?: WeekStat
}) {
	const data = await getWeeklyStats(timeFrame)

	return (
		<div
			className={cn(
				'rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card',
				className
			)}
		>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="text-body-2xlg font-bold text-dark dark:text-white">
					Profit {timeFrame || 'this week'}
				</h2>

				<PeriodPicker
					items={['this week', 'last week']}
					defaultValue={timeFrame || 'this week'}
					sectionKey="weeks_profit"
				/>
			</div>

			<BarChart
				data={[
					{
						name: 'Sales',
						data: data.sales
					},
					{
						name: 'Revenue',
						data: data.revenue
					}
				]}
			/>
		</div>
	)
}
