"use client";
import { MerchPackageRecord } from '@rcffuta/ict-lib'
import { Button } from '../ui-elements/button'
import { Eye, Pencil, Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { CategoryImage, formatNaira, openInNewTab } from '../../../../../packages/shared'
import { compactFormat } from '@/utils/format-number'
import toast from 'react-hot-toast'
import { PACKAGE_LINK } from '@/data/links';

export function PackagesTable({ categories }: { categories: MerchPackageRecord[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-gray-50 dark:bg-dark-2">
					<TableHead className="w-[100px]">Image</TableHead>
					<TableHead>Category Name</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Product Count</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{categories.map((category) => (
					<TableRow key={category.id} className="hover:bg-gray-50 dark:hover:bg-dark-3">
						<TableCell>
							<CategoryImage
								// src={category.}
								src={category.image}
								className="aspect-square w-12 rounded-md object-cover"
								alt={'Image for category ' + category.name}
							/>
						</TableCell>

						<TableCell className="font-medium">
							<div className="flex items-center gap-3">
								{category.name}
								{category.isActive && (
									<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
										Featured
									</span>
								)}
							</div>
						</TableCell>
						<TableCell className="font-semibold">
							{formatNaira(category.totalPrice)}
						</TableCell>
						<TableCell>
							{compactFormat(category.items.length)} product
							{category.items.length > 1 ? 's' : ''}
						</TableCell>
						<TableCell>{category.isActive ? 'Active' : 'Inactive'}</TableCell>
						<TableCell className="text-right">
							<Button
								label=""
								className="mr-2"
								onClick={() => {
									const link = `https://rw.rcffuta.com/shop/${category.id}`
									openInNewTab(link)
								}}
							>
								<Eye className="h-4 w-4" />
							</Button>
							<Button
								label=""
								className="mr-2"
								onClick={() => {
									const link = `${PACKAGE_LINK}/edit/${category.id}`;
									window.location.href = link;
								}}
							>
								<Pencil className="h-4 w-4" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
