"use client";
import { ProductInfo, ProductRecord } from '@rcffuta/ict-lib'
import { Table, TableAction, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
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
