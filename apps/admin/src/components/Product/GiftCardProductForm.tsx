'use client'
import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { Select } from '../FormElements/select'
import DatePickerOne from '../FormElements/DatePicker/DatePickerOne'
import { useNavigate } from '../../../../../packages/shared'
import ProductWrapperForm from './ProductFormWrapper'
import toast from 'react-hot-toast'
import productStore from '@/store/productStore'
import ProductForm from './ProductForm'
import { observer } from 'mobx-react-lite'

const redirect = '/products/gift-cards'

const MainProductForm = observer(() => {
	return (
		<ShowcaseSection title="Enter Gift Card Product Info" className="!p-6.5">
			<InputGroup
				label="Code"
				type="text"
				placeholder="Enter gift card code"
				// className="w-full xl:w-1/2"
				className="mb-4.5"
				value={productStore.code}
				handleChange={(e) => productStore.setField('code', e.target.value)}
			/>

			<InputGroup
				label="Value"
				type="number"
				placeholder="Enter gift card number"
				// className="w-full xl:w-1/2"
				className="mb-4.5"
				value={productStore.number}
				handleChange={(e) => productStore.setField('number', e.target.value)}
			/>

			<DatePickerOne
				title="Expiration Date"
				value={productStore.date}
				onChange={(date) => {
					productStore.setField('date', date?.toString() || '')
				}}
				required
			/>
		</ShowcaseSection>
	)
})

export default function GiftCardProductForm() {
	const { navigate } = useNavigate()

	return (
		<ProductWrapperForm
			handleSubmit={async (e) => {
				const toastId = 'formSaveToast'
				e.preventDefault()

				toast.loading('Saving product...', { id: toastId })

				let product

				try {
					product = await productStore.saveProduct("")
				} catch (err) {
					toast.error('Product could not save!', { id: toastId })

					return
				}

				try {
					await productStore.saveGiftCardProduct(product.id)
				} catch (err) {
					toast.error('Game could not save!', { id: toastId })
					return
				}

				toast.success('Saved product', { id: toastId })

				setTimeout(() => {
					if (!redirect) return

					navigate(redirect)
				}, 1500)
			}}
		>
			<ProductForm />

			<MainProductForm />
		</ProductWrapperForm>
	)
}
