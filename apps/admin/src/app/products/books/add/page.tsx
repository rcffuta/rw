import { BookProductForm } from "@/components/Product/BookProductForm";
import { GameProductForm } from "@/components/Product/GameProductForm";
import { ProductForm } from "@/components/Product/ProductForm";
import Breadcrumb from "@/components/ui/BreadCrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Layout",
};

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
                  label: "Books",
                  link: "/products/books",
              },
              {
                  label: "Add",
              },
          ]}
      />
      

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* <div className="flex flex-col gap-9">
        </div> */}
        <ProductForm />

        <BookProductForm />
        {/* <div className="flex flex-col gap-9">

          <SignUpForm />
        </div> */}
      </div>
    </>
  );
}
