import { MerchPackage, MerchPackageRecord } from '@rcffuta/ict-lib'
import { Button } from '../ui-elements/button'
import { Badge, Pencil, Plus, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { CategoryImage } from '../../../../../packages/shared'
import { compactFormat } from '@/utils/format-number'

export function PackagesTable({ categories }: { categories: MerchPackageRecord[] }) {
	return (
		<div className="mx-auto max-w-[1200px] rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark sm:p-6">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white">Packages</h2>
				<Button label="">
					<Plus className="mr-2 h-4 w-4" />
					Add Category
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow className="bg-gray-50 dark:bg-dark-2">
						<TableHead className="w-[100px]">Image</TableHead>
						<TableHead>Category Name</TableHead>
						<TableHead>Product Count</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category) => (
						<TableRow
							key={category.id}
							className="hover:bg-gray-50 dark:hover:bg-dark-3"
						>
							<TableCell>
								<CategoryImage
									// src={category.}
									src={''}
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
							<TableCell>{compactFormat(category.items.length)} products</TableCell>
							<TableCell>
								<Badge>{category.isActive ? 'Active' : 'Inactive'}</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button label="" className="mr-2">
									<Pencil className="h-4 w-4" />
								</Button>
								<Button
									// variant="ghost"
									// size="sm"
									label=""
									className="text-red-600 hover:text-red-700 dark:text-red-400"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {categories.length} of {categories.length} categories
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div> */}
		</div>
	)
}
