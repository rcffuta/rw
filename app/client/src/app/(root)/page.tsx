import Newsletter from "@/components/Common/Newsletter";
import { BooksProductHighlight, GameProductHighlight } from "@/components/client/Home/ProductHighlight";
import CategorList from "@/components/client/Home/Category";
import CounDown from "@/components/client/Home/Countdown";
import Hero from "@/components/client/Home/Hero";
import PromoSection from "@/components/client/Home/PromoBanner";
import PromoBanner from "@/components/client/Home/PromoBanner";
import Testimonials from "@/components/client/Home/Testimonials";
import { Metadata } from "next";

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
          <BooksProductHighlight />
          <PromoSection />
          <GameProductHighlight />
          <br/>
          {/* <CounDown /> */}
          {/* <Testimonials /> */}
          <Newsletter />
      </main>
  );
}
