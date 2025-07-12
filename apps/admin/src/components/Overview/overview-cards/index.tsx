import { compactFormat } from "@/utils/format-number";
import { getOverviewData } from "@/actions/overview.actions";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { sales, revenue, users, conversion } = await getOverviewData();

  return (
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <OverviewCard
              label={sales.label}
              data={{
                  ...sales,
                  value: compactFormat(sales.value)
              }}
              // TODO: Change Icon
              Icon={icons.Views}
          />

          <OverviewCard
              label={revenue.label}
              data={{
                  ...revenue,
                  value: '$' + compactFormat(revenue.value)
              }}
              // TODO: Change Icon
              Icon={icons.Profit}
          />

          <OverviewCard
              label={users.label}
              data={{
                  ...users,
                  value: compactFormat(users.value)
              }}
              // TODO: Change Icon
              Icon={icons.Product}
          />

          <OverviewCard
              label={conversion.label}
              data={{
                  ...conversion,
                  value: compactFormat(conversion.value)
              }}
              // TODO: Change Icon
              Icon={icons.Users}
          />
      </div>
  )
}
