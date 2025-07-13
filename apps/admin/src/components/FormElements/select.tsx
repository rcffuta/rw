'use client'

import { getCategories } from '@/actions/category.action'
import { ChevronUpIcon } from '@/components/Icons'
import { cn } from '@/utils/utils'
import { useEffect, useId, useState } from 'react'

type SelectItem = { value: string; label: string }

type PropsType = {
	label: string
	prefixIcon?: React.ReactNode
	className?: string
	required?: boolean
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
} & (
	| { placeholder?: string; defaultValue: string }
	| { placeholder: string; defaultValue?: string }
)

export function Select({
	items,
	label,
	defaultValue,
	placeholder,
	prefixIcon,
	className,
	value,
	handleChange,
	required
}: PropsType & { items: SelectItem[] }) {
	const id = useId()

	const [isOptionSelected, setIsOptionSelected] = useState(false)

	return (
		<div className={cn('space-y-3', className)}>
			<label
				htmlFor={id}
				className="block text-body-sm font-medium text-dark dark:text-white"
			>
				{label}
			</label>

			<div className="relative">
				{prefixIcon && (
					<div className="absolute left-4 top-1/2 -translate-y-1/2">{prefixIcon}</div>
				)}

				<select
					id={id}
					// defaultValue={defaultValue || ""}
					onChange={(e) => {
						if (handleChange) handleChange(e as any)
						setIsOptionSelected(true)
					}}
					value={value}
					className={cn(
						'w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6',
						isOptionSelected && 'text-dark dark:text-white',
						prefixIcon && 'pl-11.5'
					)}
					required={required}
				>
					{placeholder && (
						<option value="" disabled hidden>
							{placeholder}
						</option>
					)}

					{items.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>

				<ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
			</div>
		</div>
	)
}

export function CategorySelect(props: PropsType) {
	const [options, setOptions] = useState<SelectItem[]>([
		{
			label: 'No Category',
			value: '-1'
		}
	])

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadCategories() {
			const data = await getCategories()

			if (data.length >= 1) {
				setOptions(() =>
					data.map((e) => ({
						label: e.name,
						value: e.id.toString()
					}))
				)
			}

			setLoading(false)
		}

		if (loading) loadCategories()
	}, [loading])
	return <Select {...props} items={options} />
}
