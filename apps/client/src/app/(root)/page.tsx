import Newsletter from "@/components/Common/Newsletter";
import CategorList from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import {PromoSection1, PromoSection2} from "@/components/client/Home/PromoBanner";
import { Metadata } from "next";
import { Suspense } from "react";
import { CategoryHighlightWrapper, ProductListSkeleton } from "@/components/Common/ProductUtils";
import { APP_DESCRIPTION, APP_NAME } from "@rw/shared";
import { PackageList, ProductList } from "@/components/client/Shop/ProductList";


const maxDisplay = 50;

export const metadata: Metadata = {
    title: `Home | ${APP_NAME}`,
    description: APP_DESCRIPTION,
};

export default function HomePage() {
  return (
      <main>
          <Hero />
          {/* <CategorList /> */}

          {/* <PromoSection1 /> */}

          <Suspense
              fallback={
                  <CategoryHighlightWrapper>
                      <ProductListSkeleton length={maxDisplay} />
                  </CategoryHighlightWrapper>
              }
          >
              <PackageList maxDisplay={maxDisplay} />
          </Suspense>

          <PromoSection1 />

          <Suspense
              fallback={
                  <CategoryHighlightWrapper>
                      <ProductListSkeleton length={maxDisplay} />
                  </CategoryHighlightWrapper>
              }
          >
              <ProductList maxDisplay={maxDisplay} />
          </Suspense>

          <PromoSection2 />

          {/* <Suspense
              fallback={
                  <CategoryHighlightWrapper>
                      <ProductListSkeleton length={maxDisplay} />
                  </CategoryHighlightWrapper>
              }
          >
              <GameProductHighlight maxDisplay={maxDisplay}/>
          </Suspense> */}
          <br />
          {/* <CounDown /> */}
          {/* <Testimonials /> */}
          {/* <Newsletter /> */}
      </main>
  )
}
