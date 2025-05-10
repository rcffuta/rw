import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import { ProductForm } from "../../../components/Product/ProductForm";
import { GameProductForm } from "../../../components/Product/GameProductForm";
import { SignUpForm } from "../../../components/Product/_components/sign-up-form";
import { TopProducts } from "@/components/Tables/top-products";
import { Suspense } from "react";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Form Layout" />

      <Suspense fallback={<TopProductsSkeleton />}>
        <TopProducts />
      </Suspense>
    </>
  );
}
