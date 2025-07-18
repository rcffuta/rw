import { observer } from 'mobx-react-lite'
import { cn } from '@/utils/utils'
import { ProductVariant } from '@rcffuta/ict-lib'
import { CustomImage } from '@rw/shared'

interface VariantDisplayProps {
	variants: ProductVariant[]
	onRemove?: (index: number) => void
	onStockChange?: (index: number, stock: number) => void
	editable?: boolean
	className?: string
}

export const VariantDisplay = observer(
	({
		variants,
		onRemove,
		onStockChange,
		editable = false,
		className = ''
	}: VariantDisplayProps) => {
		return (
			<div
				className={cn(
					'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
					className
				)}
			>
				{variants.length > 0 ? (
					variants.map((variant, index) => (
						<div
							key={`${variant.color}-${index}`}
							className="relative rounded-lg border border-stroke p-4 transition-shadow hover:shadow-md dark:border-dark-3"
						>
							{/* Variant Image */}
							<div className="mb-3 aspect-square w-full overflow-hidden rounded-md bg-gray-1 dark:bg-dark-2">
								{variant.image ? (
									<CustomImage
										src={variant.image}
										alt={`${variant.color}`}
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center text-dark-6 dark:text-dark-6">
										<span className="text-sm">No image</span>
									</div>
								)}
							</div>

							{/* Variant Details */}
							<div className="space-y-2">
								{/* Color */}
								<div className="flex items-center">
									<span
										className="mr-2 h-4 w-4 rounded-full border border-stroke dark:border-dark-3"
										style={{ backgroundColor: variant.color }}
									/>
									<span className="text-sm font-medium text-dark dark:text-white">
										{variant.color}
									</span>
								</div>

								{/* Size */}
								<div className="flex items-center text-sm text-dark dark:text-white">
									<span className="mr-1 font-medium">Size:</span>
									{variant.sizes.join(",")}
								</div>
							</div>

							{/* Remove Button (if editable) */}
							{editable && (
								<button
									type="button"
									onClick={() => onRemove?.(index)}
									className="absolute right-2 top-2 rounded-full bg-red p-1 text-white transition-colors hover:bg-red-dark"
									aria-label="Remove variant"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							)}
						</div>
					))
				) : (
					<div className="col-span-full rounded-lg py-8 text-center">
						<p className="text-dark-6 dark:text-dark-6">No variants added yet</p>
					</div>
				)}
			</div>
		)
	}
)
