'use client'

import InputGroup from '@/components/FormElements/InputGroup'
import { TextAreaGroup } from '@/components/FormElements/InputGroup/text-area'
import { CategorySelect, Select } from '@/components/FormElements/select'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import PhotoUploader from '../FormElements/upload-photo'
import { observer } from 'mobx-react-lite'
import productStore from '@/store/productStore'
import { useNavigate } from '@rw/shared'
import ProductWrapperForm from './ProductFormWrapper'
import toast from 'react-hot-toast'
import DatePickerOne from '../FormElements/DatePicker/DatePickerOne'

const ProductForm = observer(() => {
	return (
		<ShowcaseSection title="Add New Product" className="!p-6.5">
			<PhotoUploader
				imageUrl={productStore.imageUrl}
				onUpload={(url) => productStore.setField('imageUrl', url || '')}
			/>
			<InputGroup
				label="Title"
				type="text"
				value={productStore.title}
				handleChange={(e) => productStore.setField('title', e.target.value)}
				placeholder="Enter product title"
				className="mb-4.5"
				required
			/>

			<CategorySelect
				label="Category"
				placeholder="Select product category"
				className="mb-4.5"
				value={productStore.category?.toString()}
				handleChange={(e) => productStore.setField('category', e.target.value)}
			/>

			<TextAreaGroup
				label="Description"
				placeholder="Enter product description"
				className="mb-4.5"
				value={productStore.description}
				handleChange={(e) => productStore.setField('description', e.target.value)}
			/>

			<div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
				<InputGroup
					label="Price"
					type="number"
					placeholder="Enter product price"
					className="w-full xl:w-1/2"
					value={productStore.price}
					handleChange={(e) => productStore.setField('price', e.target.value)}
				/>

				<InputGroup
					label="Discount Price"
					type="number"
					placeholder="Enter product discount price"
					className="w-full xl:w-1/2"
					value={productStore.discountPrice}
					handleChange={(e) => productStore.setField('discountPrice', e.target.value)}
				/>
			</div>
		</ShowcaseSection>
	)
})


const MainProductForm = observer(() => {
	return (
		<ShowcaseSection title="Enter Game Product Info" className="!p-6.5">
			<Select
				label="Platform"
				placeholder="Select game platform"
				className="mb-4.5"
				items={[]}
				value={productStore.platform}
				handleChange={(e) => productStore.setField('platform', e.target.value)}
				required
			/>

			<InputGroup
				label="Genre"
				type="text"
				placeholder="Enter game genre"
				// className="w-full xl:w-1/2"
				className="mb-4.5"
				value={productStore.genre}
				handleChange={(e) => productStore.setField('genre', e.target.value)}
				required
			/>

			<DatePickerOne
				title="Release Date"
				value={productStore.releaseDate}
				onChange={(date) => {
					productStore.setField('releaseDate', date?.toString() || '')
				}}
				required
			/>
		</ShowcaseSection>
	)
})

export default function AddProductForm() {
	const { navigate} = useNavigate()

	return (
		<ProductWrapperForm
			handleSubmit={async (e) => {
				const toastId = 'formSaveToast'
				e.preventDefault()

				toast.loading('Saving product...', { id: toastId })

				let product

				try {
					product = await productStore.saveProduct('')
				} catch (err) {
					toast.error('Product could not save!', { id: toastId })

					return
				}

				try {
					await productStore.saveGameProduct(product.id)
				} catch (err) {
					toast.error('Game could not save!', { id: toastId })
					return
				}

				toast.success('Saved product', { id: toastId })

				// setTimeout(() => {
				// 	if (!redirect) return

				// 	navigate(redirect)
				// }, 1500)
			}}
		>
			<ProductForm />

			<MainProductForm />
		</ProductWrapperForm>
	)
}
