import GameProductForm from "@/components/Product/GameProductForm";
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

          <GameProductForm/>
      </>
  );
}
