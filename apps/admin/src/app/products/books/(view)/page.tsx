import { ProductTable } from "@/components/Tables/ProductList";
import { getAllBooks } from "@gamezone/db";


export default async function Page() {
  const data = await getAllBooks();

  return (
      <ProductTable
          title="Book Products"
          products={data.map((e) => e.product)}
      />
  );
}

