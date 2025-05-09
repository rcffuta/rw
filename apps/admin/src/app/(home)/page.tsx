import { SalesOverview, SalesWeeksProfit } from "@/components/Charts/sales-chart";
import { TopSellingProducts, TopSellingProductsSkeleton } from "@/components/analytics/products";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { OverviewCardsGroup } from "../../components/Overview/overview-cards";
import { OverviewCardsSkeleton } from "../../components/Overview/overview-cards/skeleton";
import { UsedDevices } from "@/components/Charts/unused-devices";
import { RegionLabels } from "@/components/Overview/region-labels";
import { OrderHighlight } from "@/components/Order/order-highlight";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <SalesOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <SalesWeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />

        {/* <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        <RegionLabels />
         */}
        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopSellingProductsSkeleton />}>
            <TopSellingProducts />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <OrderHighlight />
        </Suspense>
      </div>
    </>
  );
}
