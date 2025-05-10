import { ProductTable } from "@/components/Tables/ProductList";
import { getAllGames, getAllProducts } from "@gamezone/db";


export default async function Page() {
  const data = await getAllGames();

  return <ProductTable title="Book Products" products={data.map((e)=>e.product)} />;
}

