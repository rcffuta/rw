'use client'

import InputGroup from '@/components/FormElements/InputGroup'
import { TextAreaGroup } from '@/components/FormElements/InputGroup/text-area'
import { CategorySelect } from '@/components/FormElements/select'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import PhotoUploader from '../FormElements/upload-photo'
import { observer } from 'mobx-react-lite'
import productStore from '@/store/productStore'

function ProductForm() {
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
}

export default observer(ProductForm)
