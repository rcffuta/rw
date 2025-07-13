import { CategoryForm } from '@/components/Product/CategoryForm'
import Breadcrumb from '@/components/ui/BreadCrumb'

export default function Page() {
	return (
		<>
			<Breadcrumb
				pageName="Create New Product Category"
				paths={[
					{
						label: 'Categories',
						link: '/categories'
					},
					{
						label: 'New'
					}
				]}
			/>

			<div className="mx-auto max-w-[700px]">
				<CategoryForm redirect="/categories" />

				{/* <CategoryForm /> */}
			</div>
		</>
	)
}
