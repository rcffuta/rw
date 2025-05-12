import EmptyRow from "@/components/Tables/EmptyTable";
import { ProductTable } from "@/components/Tables/ProductList";
import { getAllBooks } from "@gamezone/db";


export default async function Page() {
  const data = await getAllBooks();

  if (data.length < 1) return <EmptyRow/>;

  return (
      <ProductTable
          title="Book Products"
          products={data.map((e) => e.product)}
      />
  );
}

