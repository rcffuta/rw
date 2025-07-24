'use client'

import InputGroup from '@/components/FormElements/InputGroup'
import { ShowcaseSection } from '@/components/Layouts/showcase-section'
import { useNavigate } from '../../../../../packages/shared'
import toast from 'react-hot-toast'
import PhotoUploader from '../FormElements/upload-photo'
import { observer } from 'mobx-react-lite'
import { TextAreaGroup } from '../FormElements/InputGroup/text-area'
import packageStore from '@/store/packageStore'
import MultiSelect from '../FormElements/MultiSelect'
import { MerchPackageRecord } from '@rcffuta/ict-lib'
import { useEffect } from 'react'

type Props = {
	redirect?: string;
	pkg?: MerchPackageRecord;
}

const PackageForm = observer(({ redirect, pkg }: Props) => {

	const { navigate } = useNavigate();


	useEffect(() => {
		if (pkg) {
			setTimeout(() => {
				packageStore.populatePpkgInfo(pkg)
			}, 1000)
		}

		return () => {
			packageStore.reset()
		}
	}, [])

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		const toastId = 'saveCategoryToast';

		toast.loading('Saving Package...', { id: toastId })

		try {
			await packageStore.savePackage();
			toast.success('Package Saved!', { id: toastId })

			setTimeout(() => {
				if (!redirect) return

				navigate(redirect)
			}, 1500)
		} catch (err) {
			console.error('Failed to save package:', err)
			// alert("Error creating product");
			toast.error((err as Error).message || 'Package could not bre saved!', { id: toastId })
		}
	}

	return (
		<ShowcaseSection title="Enter Package details" className="!p-6.5">
			<form onSubmit={handleSubmit}>
				<PhotoUploader
					imageUrl={packageStore.image}
					onUpload={(url) => packageStore.setField('image', url ?? '')}
					folder="productImages"
					required
				/>
				<InputGroup
					label="Package Name"
					type="text"
					value={packageStore.name}
					handleChange={(e) => packageStore.setField('name', e.target.value)}
					placeholder="Enter category title"
					className="mb-4.5"
					required
				/>

				<MultiSelect
					id="Products"
					label="Select package products"
					options={packageStore.options}
					onChange={(val) => packageStore.setField('items', val)}
					initialSelected={packageStore.items.map((e) => e.productId)}
					required
				/>

				<InputGroup
					label="Price"
					type="currency"
					placeholder="Enter product price"
					// className="w-full xl:w-1/2"
					className="my-4.5"
					value={packageStore.totalPrice}
					handleChange={(e) => packageStore.setField('totalPrice', e.target.value)}
					required
				/>

				<TextAreaGroup
					label="Description"
					placeholder="Enter package description"
					className="my-4.5"
					value={packageStore.description}
					handleChange={(e) => packageStore.setField('description', e.target.value)}
				/>

				<button
					type="submit"
					className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
				>
					Save Category
				</button>
			</form>
		</ShowcaseSection>
	)
}
)

export default PackageForm;
