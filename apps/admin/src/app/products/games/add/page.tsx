import { GameProductForm } from "@/components/Product/GameProductForm";
import { ProductForm } from "@/components/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumb";

import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Form Layout",
// };

export default function Page() {
  return (
      <>
          <Breadcrumb
              pageName="Games Products"
              paths={[
                  {
                      label: "Products",
                  },
                  {
                      label: "Games",
                      link: "/products/games",
                  },
                  {
                      label: "Add",
                  },
              ]}
          />

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
              <ProductForm redirect="/products/games" />

              <GameProductForm />
          </div>
      </>
  );
}
