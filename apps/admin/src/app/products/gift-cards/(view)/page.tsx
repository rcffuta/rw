import EmptyRow from "@/components/Tables/EmptyTable";
import { ProductTable } from "@/components/Tables/ProductList";
// import { getAllGiftCards } from "@willo/db";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = [] as any[];//await getAllGiftCards();

  if (data.length < 1) return <EmptyRow/>;

  return (
      <ProductTable
          title="Book Products"
          products={data.map((e) => e.product)}
      />
  );
}

