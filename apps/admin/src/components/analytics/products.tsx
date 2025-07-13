import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { cn } from '@/utils/utils'
import { TableSkeleton } from '@/components/ui/table-skeleton'
import clsx from 'clsx'
import { slugify } from '@/utils/format-text'
import { TableRowItem } from '../ui/types'
import { fetchTopSellingProducts } from '@/actions/analytics.actions'
import { CategoryImage, formatCurrency } from '../../../../../packages/shared'
import { Info } from 'lucide-react'

const TableHeads: TableRowItem[] = [
	{ label: 'Rank' },
	{
		label: 'Product',
		side: 'left'
	},
	{ label: 'Units Sold', className: 'text-center' },
	{ label: 'Revenue', className: 'text-right' }
]

export async function TopSellingProducts({ className }: { className?: string }) {
	const data = await fetchTopSellingProducts()

	return (
		<div
			className={cn(
				'rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-dark',
				className
			)}
		>
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
					Top Selling Products
				</h2>
				{data.length > 0 && (
					<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
						{data.length} products
					</span>
				)}
			</div>

			{data.length > 0 ? (
				<div className="overflow-x-auto">
					<Table className="min-w-full">
						<TableHeader>
							<TableRow className="border-b border-gray-200 dark:border-gray-800">
								{TableHeads.map((item, i) => (
									<TableHead
										key={i}
										className={clsx(
											'px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
											item.className,
											{
												'text-left': item.side === 'left',
												'text-right': item.side === 'right'
											}
										)}
									>
										{item.label}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>

						<TableBody>
							{data.map((item) => (
								<TableRow
									key={slugify(item.name) + item.rank}
									className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
								>
									<TableCell className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
										<span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
											{item.rank}
										</span>
									</TableCell>

									<TableCell className="whitespace-nowrap px-4 py-3">
										<div className="flex items-center gap-3">
											<CategoryImage
												src={item.images[0]}
												className="size-10 rounded-lg object-cover"
												alt={`${item.name} thumbnail`}
												// fallbackClassName="bg-gray-100 dark:bg-gray-700"
											/>
											<span className="font-medium text-gray-900 dark:text-white">
												{item.name}
											</span>
										</div>
									</TableCell>

									<TableCell className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
										{item.unitsSold}
									</TableCell>

									<TableCell className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-green-600 dark:text-green-400">
										{formatCurrency(item.revenue)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center space-y-4 py-12">
					<div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
						<Info className="h-6 w-6 text-gray-400 dark:text-gray-500" />
					</div>
					<div className="text-center">
						<h3 className="text-lg font-medium text-gray-900 dark:text-white">
							No products sold yet
						</h3>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Your top selling products will appear here once sales are made
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export const TopSellingProductsSkeleton = () => {
	return (
		<div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-dark">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
					Top Selling Products
				</h2>
				<div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
			</div>
			<TableSkeleton title="" tableHeads={TableHeads} rowCount={5} />
		</div>
	)
}
