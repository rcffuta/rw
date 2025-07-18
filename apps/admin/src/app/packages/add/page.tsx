import PackageForm from '@/components/Product/CategoryForm'
import Breadcrumb from '@/components/ui/BreadCrumb'
import { PACKAGE_LINK } from '@/data/links'

export default function Page() {
	return (
		<>
			<Breadcrumb
				pageName="Create Package"
				paths={[
					{
						label: 'Packages ',
						link: '/categories'
					},
					{
						label: 'New'
					}
				]}
			/>

			<div className="mx-auto max-w-[700px]">
				<PackageForm redirect={PACKAGE_LINK} />

				{/* <CategoryForm /> */}
			</div>
		</>
	)
}
