import { TableSkeleton, TableSkeletonProps } from './table-skeleton'

export default function TableLoader({
	rowCount = 5,
	title = 'loading...',
	...rest
}: TableSkeletonProps) {
	return (
		<div className="mx-auto max-w-[750px] rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
			<TableSkeleton title={title} rowCount={rowCount} {...rest} />;
		</div>
	)
}
