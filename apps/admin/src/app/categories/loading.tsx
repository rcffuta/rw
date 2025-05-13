import { CategoryTableSkeleton } from "@/components/Tables/CategoryList";

export default function Loading() {
    return (
        <div className="max-w-[750px] mx-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <CategoryTableSkeleton/>
        </div>
    )
}