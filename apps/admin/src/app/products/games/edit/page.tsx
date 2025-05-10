import PhotoUploader from "@/app/settings/_components/upload-photo";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { GameProductForm } from "@/components/Product/GameProductForm";
import { ProductForm } from "@/components/Product/ProductForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* <div className="flex flex-col gap-9">
        </div> */}
          <ProductForm />

        <GameProductForm />
        {/* <div className="flex flex-col gap-9">

          <SignUpForm />
        </div> */}
      </div>
    </>
  );
}
