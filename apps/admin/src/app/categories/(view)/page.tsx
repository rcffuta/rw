import EmptyRow from "@/components/Tables/EmptyTable";
import ProductTable from '@/components/Tables/ProductTable'
import { fetchProducts } from "@/utils/actionUtils";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetchProducts();
  
  if (data.length < 1) return <EmptyRow/>;

  return <ProductTable products={data} />;
}

