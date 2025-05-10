import { ProductTable } from "@/components/Tables/ProductList";
import { getAllProducts } from "@gamezone/db";


export default async function Page() {
  const data = await getAllProducts();

  return <ProductTable title="Book Products" products={data} />;
}

