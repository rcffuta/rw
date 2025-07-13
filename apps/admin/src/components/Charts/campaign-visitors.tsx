import { TrendingUpIcon } from '@/components/Icons'
import { compactFormat } from '@/utils/format-number'
import { cn } from '@/utils/utils'
// import { getCampaignVisitorsData } from "@/actions/analytics.actions";
import { ApexOptions } from 'apexcharts'
import { BarChart } from './chart-items'

const options: ApexOptions = {
	colors: ['#5750F1'],
	chart: {
		fontFamily: 'Satoshi, sans-serif',
		type: 'bar',
		height: 200,
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '40%',
			borderRadius: 3
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		show: true,
		width: 4,
		colors: ['transparent']
	},
	xaxis: {
		axisBorder: {
			show: false
		},
		axisTicks: {
			show: false
		}
	},
	legend: {
		show: true,
		position: 'top',
		horizontalAlign: 'left',
		fontFamily: 'Satoshi'
	},
	grid: {
		strokeDashArray: 7,
		yaxis: {
			lines: {
				show: true
			}
		}
	},
	fill: {
		opacity: 1
	},
	tooltip: {
		x: {
			show: false
		}
	}
}

export async function CampaignVisitors({ className }: { className?: string }) {
	const data: any = {} // await getCampaignVisitorsData();

	return null

	return (
		<div
			className={cn(
				'rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card',
				className
			)}
		>
			<div className="border-b border-stroke px-6 py-5.5 dark:border-dark-3">
				<div className="flex justify-between">
					<h2 className="mb-1.5 text-2xl font-bold text-dark dark:text-white">
						Campaign Visitors
					</h2>

					<div className="mb-0.5 text-2xl font-bold text-dark dark:text-white">
						{compactFormat(data.total_visitors)}
					</div>
				</div>

				<div className="flex justify-between">
					<div className="text-sm font-medium">Last Campaign Performance</div>

					<div
						className={cn(
							'flex items-center gap-1.5',
							data.performance > 0 ? 'text-green' : 'text-red'
						)}
					>
						<TrendingUpIcon
							className={`${data.performance > 0 ? '-rotate-6' : 'scale-y-[-1]'}`}
						/>

						<span className="text-sm font-medium">{data.performance}%</span>
					</div>
				</div>
			</div>

			<BarChart
				options={options}
				data={[
					{
						name: 'Visitors',
						data: data.chart
					}
				]}
			/>
		</div>
	)
}
