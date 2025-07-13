import { ProductInfo, ProductRecord } from '@rcffuta/ict-lib'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { TableRowItem } from '../ui/types'

export const productTableHeadings: TableRowItem[] = [
	{
		label: 'Image',
		className: 'w-[100px]'
	},
	{
		label: 'Product'
	},
	{
		label: 'Description'
	},
	{
		label: 'Price'
	},
	{
		label: 'Variants'
	},
	{
		label: 'Actions',
		className: 'text-right'
	}
]

export default function ProductTable({ products }: { products: ProductRecord[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-gray-50 dark:bg-dark-2">
					{productTableHeadings.map((e) => (
						<TableHead className={e.className}>{e.label}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.name} className="hover:bg-gray-50 dark:hover:bg-dark-3">
						<TableCell>
							<div className="flex items-center">
								<img
									src={product.images[0]}
									alt={product.name}
									className="aspect-square w-12 rounded-md object-cover"
								/>
								{product.images.length > 1 && (
									<span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
										+{product.images.length - 1}
									</span>
								)}
							</div>
						</TableCell>
						<TableCell className="font-medium">{product.name}</TableCell>
						<TableCell className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
							{product.description || 'No description'}
						</TableCell>
						<TableCell>${product.price.toFixed(2)}</TableCell>
						<TableCell>
							<div className="flex flex-wrap gap-1">
								{product.variants.map((variant, i) => (
									<span
										key={i}
										className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-dark-4 dark:text-gray-200"
									>
										{variant.size}
									</span>
								))}
							</div>
						</TableCell>
						<TableCell className="text-right">
							{/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
