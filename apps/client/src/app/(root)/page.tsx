import Newsletter from "@/components/Common/Newsletter";
import { BooksProductHighlight, GameProductHighlight } from "@/components/client/Home/ProductHighlight";
import CategorList from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import PromoSection from "@/components/client/Home/PromoBanner";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProductListSkeleton } from "@/components/client/Shop/ProductSkeleton";

export const metadata: Metadata = {
    title: "Home | GameZone",
    description:
        "E-commerce web application that allows users to browse, purchase, and manage their orders for games, books, and gift cards.",
};

export default function HomePage() {
  return (
      <main>
          <Hero />
          <CategorList />
          
          <Suspense fallback={<ProductListSkeleton/>}>
            <BooksProductHighlight />
          </Suspense>
          
          <PromoSection />
          
          <Suspense fallback={<ProductListSkeleton/>}>
            <GameProductHighlight />
          </Suspense>
          <br/>
          {/* <CounDown /> */}
          {/* <Testimonials /> */}
          <Newsletter />
      </main>
  );
}
