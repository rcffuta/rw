import { cn } from '@/utils/utils'
import { formatNaira } from '@rw/shared'
import { type HTMLInputTypeAttribute, useId, useState, useEffect} from 'react'

export type InputGroupProps = {
	className?: string
	label: string
	placeholder: string
	type: HTMLInputTypeAttribute
	fileStyleVariant?: 'style1' | 'style2'
	required?: boolean
	disabled?: boolean
	active?: boolean
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	name?: string
	icon?: React.ReactNode
	iconPosition?: 'left' | 'right'
	height?: 'sm' | 'default'
	defaultValue?: string
	id?: string
}

const InputGroup: React.FC<InputGroupProps> = ({
	className,
	label,
	type,
	placeholder,
	required,
	disabled,
	active,
	handleChange,
	icon,
	id: noId,
	value: inputValue,
	...props
}) => {
	const id = noId || useId()
	const isCurrencyInput = type === 'currency'
	const isColorInput = type === 'color'
	const showColorPreview = isColorInput

	const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9.]/g, '')

		if (value === '') {
			return
		}

		const numValue = parseFloat(value)
		if (!isNaN(numValue)) {

			e.target.value = formatNaira(numValue, "", 0);
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (isCurrencyInput) {
			handleCurrencyChange(e)
		}
	}

	return (
		<div className={className}>
			<label htmlFor={id} className="text-body-sm font-medium text-dark dark:text-white">
				{label}
				{required && <span className="ml-1 select-none text-red">*</span>}
			</label>

			<div
				className={cn(
					'relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2',
					props.iconPosition === 'left' ? '[&_svg]:left-4.5' : '[&_svg]:right-4.5',
					isColorInput && 'flex items-center gap-3',
					isCurrencyInput && 'relative'
				)}
			>
				{showColorPreview && (
					<div
						className="size-8 rounded-md border border-stroke dark:border-dark-3"
						style={{ backgroundColor: inputValue }}
					/>
				)}

				{isCurrencyInput && (
					<span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark dark:text-white">
						₦
					</span>
				)}

				<input
					id={id}
					type={isColorInput ? 'text' : isCurrencyInput ? 'text' : type}
					name={props.name}
					placeholder={placeholder}
					onChange={handleChange}
					onBlur={isCurrencyInput ? handleBlur : undefined}
					value={inputValue}
					defaultValue={props.defaultValue}
					className={cn(
						'w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary',
						type === 'file'
							? getFileStyles(props.fileStyleVariant!)
							: 'px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white',
						props.iconPosition === 'left' && 'pl-12.5',
						props.height === 'sm' && 'py-2.5',
						isCurrencyInput && 'pl-8'
					)}
					required={required}
					disabled={disabled}
					data-active={active}
				/>

				{icon}
			</div>
		</div>
	)
}

export default InputGroup;

export function getFileStyles(variant: 'style1' | 'style2') {
	switch (variant) {
		case 'style1':
			return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`
		default:
			return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`
	}
}
