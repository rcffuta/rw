import { compactFormat } from "@/utils/format-number";
import { getOverviewData } from "@/actions/overview.actions";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { sales, orders, avgOrder, converserion } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label={sales.label}
        data={{
          ...sales,
          value: compactFormat(sales.value),
        }}
        // TODO: Change Icon
        Icon={icons.Views}
      />

      <OverviewCard
        label={orders.label}
        data={{
          ...orders,
          value: "$" + compactFormat(orders.value),
        }}
        // TODO: Change Icon
        Icon={icons.Profit}
      />

      <OverviewCard
        label={avgOrder.label}
        data={{
          ...avgOrder,
          value: compactFormat(avgOrder.value),
        }}
        // TODO: Change Icon
        Icon={icons.Product}
      />

      <OverviewCard
        label={converserion.label}
        data={{
          ...converserion,
          value: compactFormat(converserion.value),
        }}
        // TODO: Change Icon
        Icon={icons.Users}
      />
    </div>
  );
}
