import EmptyRow from "@/components/Tables/EmptyTable";
import { ProductTable } from "@/components/Tables/ProductList";
import { getAllGames } from "@gamezone/db";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getAllGames();
  if (data.length < 1) return <EmptyRow/>;

  return <ProductTable title="Book Products" products={data.map((e)=>e.product)} />;
}

