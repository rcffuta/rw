import { useState, useRef, KeyboardEvent, FocusEvent } from 'react'
import { InputGroupProps } from './InputGroup'
import { cn } from '@/utils/utils'

interface PillInputProps extends Omit<InputGroupProps, 'handleChange' | 'value' | "type" |"placeholder"> {
	pills: string[]
	onPillsChange: (pills: string[]) => void
	placeholder?: string
	maxPills?: number
	required?: boolean;
}

export const PillInput = ({
	className,
	label,
	placeholder = 'Add items...',
	required,
	disabled,
	pills,
	onPillsChange,
	maxPills,
	id,
	...props
}: PillInputProps) => {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const addPills = (value: string) => {
		if (disabled) return

		const newPills = value
			.split(',')
			.map((pill) => pill.trim())
			.filter((pill) => pill.length > 0 && !pills.includes(pill))

		if (newPills.length > 0 && (!maxPills || pills.length + newPills.length <= maxPills)) {
			onPillsChange([...pills, ...newPills])
			setInputValue('')
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return

		if (e.key === ',' || e.key === 'Enter') {
			e.preventDefault()
			addPills(inputValue)
		} else if (e.key === 'Backspace' && inputValue === '' && pills.length > 0) {
			e.preventDefault()
			onPillsChange(pills.slice(0, -1))
		}
	}

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		if (inputValue.trim()) {
			addPills(inputValue)
		}
	}

	const removePill = (index: number) => {
		if (disabled) return
		onPillsChange(pills.filter((_, i) => i !== index))
	}

	return (
		<div className={cn('relative', className)}>
			{label && (
				<label htmlFor={id} className="text-body-sm font-medium text-dark dark:text-white">
					{label}
					{required && <span className="ml-1 select-none text-red">*</span>}
				</label>
			)}

			<div
				className={cn(
					'mt-3 flex min-h-12 flex-wrap items-center gap-2 rounded-lg border-[1.5px] bg-transparent p-2 outline-none transition',
					'border-stroke dark:border-dark-3',
					disabled
						? 'cursor-default bg-gray-2 dark:bg-dark'
						: 'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-20',
					pills.length > 0 && !disabled ? 'border-primary dark:border-primary' : '',
					props.iconPosition === 'left' ? 'pl-12.5' : '',
					props.height === 'sm' ? 'py-2.5' : ''
				)}
				onClick={() => inputRef.current?.focus()}
			>
				{props.iconPosition === 'left' && props.icon && (
					<div className="absolute left-4.5 top-1/2 -translate-y-1/2">{props.icon}</div>
				)}

				{pills.map((pill, index) => (
					<div
						key={`${pill}-${index}`}
						className={cn(
							'flex items-center gap-1 rounded-full px-3 py-1 text-body-sm',
							disabled
								? 'bg-gray-3 text-dark-6 dark:bg-dark-3 dark:text-dark-6'
								: 'bg-primary text-white'
						)}
					>
						{pill}
						{!disabled && (
							<button
								type="button"
								onClick={() => removePill(index)}
								className="flex h-4 w-4 items-center justify-center rounded-full transition-all hover:bg-white hover:bg-opacity-20"
								aria-label={`Remove ${pill}`}
							>
								&times;
							</button>
						)}
					</div>
				))}

				{(!maxPills || pills.length < maxPills) && (
					<input
						ref={inputRef}
						id={id}
						type="text"
						value={inputValue}
						onChange={(e) => !disabled && setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						onBlur={handleBlur}
						placeholder={pills.length === 0 ? placeholder : ''}
						required={required}
						className={cn(
							'min-w-[100px] flex-1 bg-transparent outline-none',
							'text-dark placeholder:text-dark-6 dark:text-white dark:placeholder:text-dark-6',
							props.height === 'sm' ? 'py-0.5' : 'py-1',
							disabled ? 'cursor-not-allowed' : ''
						)}
						disabled={disabled}
						data-active={props.active}
					/>
				)}

				{props.iconPosition === 'right' && props.icon && (
					<div className="absolute right-4.5 top-1/2 -translate-y-1/2">{props.icon}</div>
				)}
			</div>

			{pills.length > 0 && !disabled && (
				<div className="absolute -bottom-5 left-0 text-xs text-dark-6 dark:text-dark-6">
					{maxPills ? `${pills.length}/${maxPills} - ` : ''}Press comma or enter to add
				</div>
			)}
		</div>
	)
}
