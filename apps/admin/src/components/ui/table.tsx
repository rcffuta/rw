import { cn } from '@/utils/utils'
import * as React from 'react'
import { Dropdown, DropdownContent, DropdownTrigger } from './dropdown'
import { ChevronUpIcon } from '../Icons'
import toast from 'react-hot-toast'

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
	return (
		<div className="relative w-full overflow-x-auto">
			<table className={cn('w-full caption-bottom text-sm', className)} {...props} />
		</div>
	)
}

export function TableHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <thead className={cn('[&_tr]:border-b', className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

export function TableFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tfoot
			className={cn(
				'border-t bg-neutral-100/50 font-medium dark:bg-neutral-800/50 [&>tr]:last:border-b-0',
				className
			)}
			{...props}
		/>
	)
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={cn(
				'border-b transition-colors hover:bg-neutral-100/50 data-[state=selected]:bg-neutral-100 dark:border-dark-3 dark:hover:bg-dark-2 dark:data-[state=selected]:bg-neutral-800',
				className
			)}
			{...props}
		/>
	)
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return (
		<th
			className={cn(
				'h-12 px-4 text-left align-middle font-medium text-neutral-500 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0',
				className
			)}
			{...props}
		/>
	)
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td
			className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
			{...props}
		/>
	)
}



export function TableAction({
	options,
}: {
	options: {
		label: React.ReactNode
		onClick: () => void
		disabled?: boolean
	}[]
}) {
	const [open, setOpen] = React.useState(false)

	return (
		<Dropdown isOpen={open} setIsOpen={() => setOpen((p) => !p)}>
			<DropdownTrigger
				className={cn(
					"flex h-8 w-full items-center justify-between gap-x-1 rounded-md border border-[#E8E8E8] bg-white px-3 py-2 text-sm font-medium text-dark-5 outline-none ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-neutral-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[placeholder]:text-neutral-400 [&>span]:line-clamp-1 [&[data-state='open']>svg]:rotate-0"
					// minimal &&
					// 	'border-none bg-transparent p-0 text-dark dark:bg-transparent dark:text-white'
				)}
			>
				<span className="capitalize">View/Edit</span>

				<ChevronUpIcon className="size-4 rotate-180 transition-transform" />
			</DropdownTrigger>

			<DropdownContent
				align="end"
				className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[7rem] overflow-hidden rounded-lg border border-[#E8E8E8] bg-white p-1 font-medium text-dark-5 shadow-md dark:border-dark-3 dark:bg-dark-2 dark:text-current"
			>
				<ul>
					{options.map((item, index) => (
						<li key={index}>
							<button
								className="flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white"
								onClick={() => {
									if (item.disabled) {
										toast.error("You cannot perform this action", {
											id: "noPerform"
										})
									};
									item.onClick()
								}}
								disabled={item.disabled}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</DropdownContent>
		</Dropdown>
	)
}