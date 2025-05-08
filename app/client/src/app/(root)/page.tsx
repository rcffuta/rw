import Newsletter from "@/components/Common/Newsletter";
import BestSeller from "@/components/client/Home/BestSeller";
import Categories from "@/components/client/Home/Categories";
import CounDown from "@/components/client/Home/Countdown";
import Hero from "@/components/client/Home/Hero";
import NewArrival from "@/components/client/Home/NewArrivals";
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
          <Categories />
          <NewArrival />
          <PromoBanner />
          <BestSeller />
          <CounDown />
          <Testimonials />
          <Newsletter />
      </main>
  );
}
