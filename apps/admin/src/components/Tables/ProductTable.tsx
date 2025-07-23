"use client";
import { ProductInfo, ProductRecord } from '@rcffuta/ict-lib'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { TableRowItem } from '../ui/types'
import { CustomImage, formatNaira, openInNewTab, truncateText, useNavigate } from '@rw/shared'
import { Dropdown, DropdownContent, DropdownTrigger } from '../ui/dropdown'
import { cn } from '@/utils/utils'
import { ChevronUpIcon } from '../Icons'
import { ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const productTableHeadings: TableRowItem[] = [
	{
		label: 'Image',
		className: 'w-[140px] text-center'
	},
	{
		label: 'Product',
		className: 'text-center'
	},
	// {
	// 	label: 'Description',
	// 	className: 'w-[180px] text-center'
	// },
	{
		label: 'Price',
		className: 'text-center'
	},
	{
		label: 'Variants',
		className: 'text-center'
	},
	{
		label: 'Actions',
		className: 'w-[140px] text-center'
	}
]


function TableAction({options}:{options: {
	label: ReactNode;
	onClick: ()=>void;
}[]}) {
	const [open, setOpen] = useState(false);


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
				className="z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-[7rem] overflow-hidden rounded-lg border border-[#E8E8E8] bg-white p-1 font-medium text-dark-5 shadow-md dark:border-dark-3 dark:bg-dark-2 dark:text-current"
			>
				<ul>
					{options.map((item, index) => (
						<li key={index}>
							<button
								className="flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white"
								onClick={() => {
									item.onClick()
								}}
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

export default function ProductTable({ products }: { products: ProductRecord[] }) {

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-gray-50 dark:bg-dark-2">
					{productTableHeadings.map((e,index) => (
						<TableHead className={e.className} key={index}>{e.label}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => {
					const uniqueSizes = [...new Set(product.variants.flatMap((variant) => variant.sizes))]
					return (
						<TableRow
							key={product.name}
							className="z-9 hover:bg-gray-50 dark:hover:bg-dark-3"
						>
							<TableCell>
								<div className="flex items-center">
									<CustomImage
										src={product.variants.at(0)?.image || ''}
										alt={product.name}
										className="aspect-square w-12 rounded-md object-cover"
									/>
								</div>
							</TableCell>
							<TableCell className="font-bold text-center">
								{product.name}{' '}
								{product.variants.length > 1 && (
									<span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
										({product.variants.length} variant
										{product.variants.length > 1 ? 's' : ''})
									</span>
								)}
							</TableCell>
							{/* <TableCell className="text-sm text-gray-600 dark:text-gray-300">
								{truncateText(product.description || '') || '-- No description --'}
							</TableCell> */}
							<TableCell className="font-bold text-lg">
								{/* <div className='block bg-gray-7 mx-auto'> */}
									{formatNaira(product.price)}
								{/* </div> */}
							</TableCell>
							<TableCell>
								<div className="flex flex-wrap gap-1 justify-center">
									{uniqueSizes.map((size, i) => (
										<span
											key={i}
											className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-800 dark:bg-dark-4 dark:text-gray-200"
										>
											{size}
										</span>
									))}
								</div>
							</TableCell>
							<TableCell className="text-right">
								<TableAction
									options={[
										{
											label: 'View',
											onClick() {
												// toast.error('View not available yet', {
												// 	id: product.id
												// })
												const link = `https://rw.rcffuta.com/shop/${product.id}`;

												// navigate(, {

												// })

												openInNewTab(link);
											}
										},
										{
											label: 'Edit',
											onClick() {
												toast.error('Edit not available yet', {
													id: product.id
												})
											}
										}
									]}
								/>
							</TableCell>
						</TableRow>
					)})}
			</TableBody>
		</Table>
	)
}
