
import { getAllProducts } from "@gamezone/db";
import { ProductTable } from "@/components/Tables/ProductList";

export default async function Page() {
  const data = await getAllProducts();

  return <ProductTable title="Game Products" products={data} />;
}
