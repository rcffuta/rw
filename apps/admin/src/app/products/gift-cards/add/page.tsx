
import GiftCardProductForm from "@/components/Product/GiftCardProductForm";
import Breadcrumb from "@/components/ui/BreadCrumb";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
      <>
          <Breadcrumb
              pageName="Gift Card Products"
              paths={[
                  {
                      label: "Products",
                  },
                  {
                      label: "Gift Card",
                      link: "/products/gift-cards",
                  },
                  {
                      label: "Add",
                  },
              ]}
          />

          <GiftCardProductForm/>
      </>
  );
}
