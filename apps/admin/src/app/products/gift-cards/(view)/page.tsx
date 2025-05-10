import { ProductTable } from "@/components/Tables/ProductList";
import { getAllGiftCards } from "@gamezone/db";


export default async function Page() {
  const data = await getAllGiftCards();

  return (
      <ProductTable
          title="Book Products"
          products={data.map((e) => e.product)}
      />
  );
}

