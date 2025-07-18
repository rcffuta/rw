'use client'
import { Option } from '@/types/form.types'
import { PackageItem } from '@rcffuta/ict-lib'
import React, { ReactNode, useEffect, useRef, useState } from 'react'



interface DropdownProps {
	id: string
	options: Option[]
	onChange: (values: PackageItem[]) => void
	label: ReactNode
	required?: boolean
	initialSelected?: string[]
}

const MultiSelect: React.FC<DropdownProps> = ({
	id,
	options: givenOptions,
	label,
	required,
	onChange,
	initialSelected = []
}) => {
	const [options, setOptions] = useState<Option[]>(() =>
		givenOptions.map((option) => ({
			...option,
			selected: initialSelected.includes(option.value)
		}))
	)
	const [show, setShow] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	// Update selected values when options prop changes
	useEffect(() => {
		setOptions(
			givenOptions.map((option) => ({
				...option,
				selected: initialSelected.includes(option.value)
			}))
		)
	}, [givenOptions, initialSelected])

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropdownRef.current || !triggerRef.current) return
			if (
				!dropdownRef.current.contains(event.target as Node) &&
				!triggerRef.current.contains(event.target as Node)
			) {
				setShow(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const toggleDropdown = () => {
		setShow((prev) => !prev)
	}

	const handleSelect = (index: number) => {
		const newOptions = [...options]
		newOptions[index].selected = !newOptions[index].selected
		setOptions(newOptions)

		// Get all selected values and call onChange
		const selectedValues = newOptions
			.filter((option) => option.selected)
			.map((option) => option.data)

		onChange(selectedValues)
	}

	const removeOption = (value: string) => {
		const newOptions = options.map((option) =>
			option.value === value ? { ...option, selected: false } : option
		)
		setOptions(newOptions)

		const selectedValues: PackageItem[] = newOptions
			.filter((option) => option.selected)
			.map((option) => option.data)

		onChange(selectedValues)
	}

	const selectedValues = options.filter((option) => option.selected).map((option) => option.value)

	const selectedOptions = options.filter((option) => option.selected)

	return (
		<div className="relative z-50">
			<label htmlFor={id} className="text-body-sm font-medium text-dark dark:text-white">
				{label}
				{required && <span className="ml-1 select-none text-red">*</span>}
			</label>

			<div className="mt-3">
				<div className="flex flex-col items-center">
					<div className="relative z-20 inline-block w-full">
						<div className="relative flex flex-col items-center">
							<div
								ref={triggerRef}
								onClick={toggleDropdown}
								className="w-full cursor-pointer"
							>
								<div className="flex rounded-[7px] border-[1.5px] border-stroke py-[9px] pl-3 pr-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2">
									<div className="flex flex-auto flex-wrap gap-3">
										{selectedOptions.length > 0 ? (
											selectedOptions.map((option, index) => (
												<div
													key={index}
													className="flex items-center justify-center rounded-[5px] border-[.5px] border-stroke bg-gray-2 px-2.5 py-[3px] text-body-sm font-medium dark:border-dark-3 dark:bg-dark"
												>
													<div className="max-w-full flex-initial">
														{option.text}
													</div>
													<div className="flex flex-auto flex-row-reverse">
														<div
															onClick={(e) => {
																e.stopPropagation()
																removeOption(option.value)
															}}
															className="cursor-pointer pl-1 hover:text-red"
														>
															<svg
																className="fill-current"
																role="button"
																width="12"
																height="12"
																viewBox="0 0 12 12"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
																	fill="currentColor"
																/>
															</svg>
														</div>
													</div>
												</div>
											))
										) : (
											<div className="flex-1">
												<input
													placeholder="Select options"
													readOnly
													className="h-full w-full appearance-none bg-transparent p-1 px-2 text-dark-5 outline-none dark:text-dark-6"
												/>
											</div>
										)}
									</div>
									<div className="flex items-center py-1 pl-1 pr-1">
										<svg
											className={`fill-current text-dark-4 transition-transform duration-200 dark:text-dark-6 ${show ? 'rotate-180' : ''}`}
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M3.69149 7.09327C3.91613 6.83119 4.31069 6.80084 4.57277 7.02548L9.99936 11.6768L15.4259 7.02548C15.688 6.80084 16.0826 6.83119 16.3072 7.09327C16.5319 7.35535 16.5015 7.74991 16.2394 7.97455L10.4061 12.9745C10.172 13.1752 9.82667 13.1752 9.59261 12.9745L3.75928 7.97455C3.4972 7.74991 3.46685 7.35535 3.69149 7.09327Z"
												fill="currentColor"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Dropdown options */}
							<div
								className={`absolute left-0 top-full z-40 w-full overflow-y-auto rounded bg-white shadow-1 dark:bg-dark-2 dark:shadow-card ${
									show ? 'block' : 'hidden'
								}`}
								ref={dropdownRef}
							>
								<div className="flex w-full flex-col">
									{options.map((option, index) => (
										<div
											key={index}
											className={`w-full cursor-pointer border-b border-stroke hover:bg-primary/5 dark:border-dark-3 ${
												option.selected ? 'bg-primary/10' : ''
											}`}
											onClick={() => handleSelect(index)}
										>
											<div className="relative flex w-full items-center p-2 pl-2">
												<div className="flex w-full items-center">
													<div className="mx-2 leading-6">
														{option.text}
													</div>
												</div>
												{option.selected && (
													<div className="text-primary">
														<svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M13.3332 4L5.99984 11.3333L2.6665 8"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MultiSelect;
