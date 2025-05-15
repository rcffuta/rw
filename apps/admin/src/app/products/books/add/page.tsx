
import BookProductForm from "@/components/Product/BookProductForm";
import Breadcrumb from "@/components/ui/BreadCrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Products",
};

export default function Page() {
  return (
    <>
      <Breadcrumb
          pageName="Book Products"
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
      

      <BookProductForm />
    </>
  );
}
