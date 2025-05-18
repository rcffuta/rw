import Newsletter from "@/components/Common/Newsletter";
import { BooksProductHighlight, GameProductHighlight } from "@/components/client/Home/ProductHighlight";
import CategorList from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import PromoSection from "@/components/client/Home/PromoBanner";
import { Metadata } from "next";
import { Suspense } from "react";
import { CategoryHighlightWrapper, ProductListSkeleton } from "@/components/Common/ProductUtils";
import { APP_DESCRIPTION, APP_NAME } from "@willo/lib";


const maxDisplay = 12;

export const metadata: Metadata = {
    title: `Home | ${APP_NAME}`,
    description: APP_DESCRIPTION,
};

export default function HomePage() {
  return (
      <main>
          <Hero />
          <CategorList />

          <Suspense
              fallback={
                  <CategoryHighlightWrapper>
                      <ProductListSkeleton length={maxDisplay} />
                  </CategoryHighlightWrapper>
              }
          >
              <BooksProductHighlight maxDisplay={maxDisplay}/>
          </Suspense>

          <PromoSection />

          <Suspense
              fallback={
                  <CategoryHighlightWrapper>
                      <ProductListSkeleton length={maxDisplay} />
                  </CategoryHighlightWrapper>
              }
          >
              <GameProductHighlight maxDisplay={maxDisplay}/>
          </Suspense>
          <br />
          {/* <CounDown /> */}
          {/* <Testimonials /> */}
          <Newsletter />
      </main>
  );
}
