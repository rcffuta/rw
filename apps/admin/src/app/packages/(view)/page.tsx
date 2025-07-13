import { PackagesTable } from "@/components/Tables/CategoryTable";
import EmptyRow from "@/components/Tables/EmptyTable";
import { fetchPackages } from "@/utils/actionUtils";

export const dynamic = "force-dynamic";

export default async function Page() {
    const data = await fetchPackages();

    let template = null;
    
    if (data.length < 1) template = <EmptyRow/>;

    else template = <PackagesTable categories={data} />;

    return (
        <div className="mx-auto max-w-[1200px] rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark sm:p-6">
            {template}
        </div>
    )
}
