'use client'

import InputGroup from '@/components/FormElements/InputGroup'
import { TextAreaGroup } from '@/components/FormElements/InputGroup/text-area'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import PhotoUploader from '../FormElements/upload-photo'
import { observer } from 'mobx-react-lite'
import productStore from '@/store/productStore'
import { useNavigate } from '@rw/shared'
import ProductWrapperForm from './ProductFormWrapper'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { PillInput } from '../FormElements/PillInput'
import { VariantDisplay } from '../ui/VariantDisplay'
import { ProductVariant } from '@rcffuta/ict-lib'
import { cn } from '@/utils/utils'
import { PRODUCTS_LINK } from '@/data/links'

const ProductForm = observer(() => {
	const variants = productStore.variants
	return (
		<ShowcaseSection title="Add New Product" className="!p-6.5">
			<InputGroup
				label="Name"
				type="text"
				value={productStore.name}
				handleChange={(e) => productStore.setField('name', e.target.value)}
				placeholder="Enter product title"
				className="mb-4.5"
				required
			/>

			<InputGroup
				label="Price"
				type="currency"
				placeholder="Enter product price"
				// className="w-full xl:w-1/2"
				className="mb-4.5"
				value={productStore.price}
				handleChange={(e) => productStore.setField('price', e.target.value)}
				required
			/>

			<TextAreaGroup
				label="Description"
				placeholder="Enter product description"
				className="mb-4.5"
				value={productStore.description}
				handleChange={(e) => productStore.setField('description', e.target.value)}
				
			/>
			<br />
			<hr />
			<br />

			<VariantDisplay variants={variants} />
		</ShowcaseSection>
	)
})


const MainProductForm = observer(() => {

	const [picture, setPicture] = useState("");
	const [sizes, setSizes] = useState<string[]>([]);
	const [color, setColor] = useState('');

	function saveVariant() {
		const data: ProductVariant = {
			color: color,
			image: picture,
			sizes
		}


		productStore.addVariant(data);

		reset()

	}

	function reset() {
		setSizes([]);
		setColor("");
		setPicture("");
	}



	const isRequired = productStore.isVariantRequired;


	


	return (
		<ShowcaseSection title="Enter Game Product Info" className="!p-6.5">
			<div>
				<PhotoUploader
					imageUrl={picture}
					onUpload={(url) => setPicture(url || '')}
					required={isRequired}
					folder='productImages'
				/>

				<PillInput
					label="Product Tags"
					pills={sizes}
					onPillsChange={setSizes}
					placeholder="Add tags (comma separated)"
					maxPills={5}
					// icon={<TagIcon />}
					iconPosition="left"
					className="mb-4.5"
					required={isRequired}
				/>

				<br/>
				<InputGroup
					label="Color"
					type="color"
					value={color}
					handleChange={(e) => setColor(e.target.value)}
					placeholder="Enter product color"
					className="mb-4.5"
					required={isRequired}
				/>

				<div className="mt-5 flex justify-end">
					<button
						type="button"
						onClick={() => {
							saveVariant()
						}}
						className={cn(
							'w-full rounded-lg px-6 py-3 font-medium text-white transition-colors sm:w-auto',
							'hover:bg-primary-dark bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
							'disabled:cursor-not-allowed disabled:opacity-50'
						)}
						disabled={!picture || sizes.length === 0}
					>
						Save Variant
					</button>
				</div>
			</div>
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
					product = await productStore.saveProduct()
				} catch (err) {
					toast.error('Product could not save!', { id: toastId })

					return
				}

				try {
					// await productStore.saveGameProduct(product.id)
				} catch (err) {
					toast.error('Game could not save!', { id: toastId })
					return
				}

				toast.success('Saved product', { id: toastId })

				setTimeout(() => {
					// if (!redirect) return

					navigate(PRODUCTS_LINK)
				}, 1500)
			}}
		>
			<ProductForm />

			<MainProductForm />
		</ProductWrapperForm>
	)
}
