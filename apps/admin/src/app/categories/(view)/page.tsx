import { getCategoryList } from "@/actions/category.action";
import { CategoryTable } from "@/components/Tables/CategoryList";
import EmptyRow from "@/components/Tables/EmptyTable";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getCategoryList();
  
  if (data.length < 1) return <EmptyRow/>;

  return <CategoryTable title="All Categories" categories={data} />;
}

