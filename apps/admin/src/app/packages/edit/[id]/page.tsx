import PackageForm from '@/components/Product/CategoryForm'
import Breadcrumb from '@/components/ui/BreadCrumb'
import { PACKAGE_LINK } from '@/data/links'
import { getPackageById } from '@rcffuta/ict-lib';
import { notFound } from 'next/navigation';


type Props = { params: Promise<{ id: string }> }



export default async function Page({ params }: Props) {
	const pkdId = (await params).id;
	const {
		message,
		success,
		data
	} = await getPackageById(pkdId);


	if (!success) {
		console.error(message);
		return notFound();
	}

	return (
		<>
			<Breadcrumb
				pageName="Create Package"
				paths={[
					{
						label: 'Packages ',
						link: PACKAGE_LINK
					},
					{
						label: 'Modify'
					}
				]}
			/>

			<div className="mx-auto max-w-[700px]">
				<PackageForm redirect={PACKAGE_LINK} pkg={data} />
			</div>
		</>
	)
}
