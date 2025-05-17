import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/utils/utils";
// import { getDevicesUsedData } from "@/actions/charts.actions";
import { DonutChart } from "./chart-items";
import { fetchOrderStatusStats } from "@/actions/analytics.actions";

type PropsType = {
    // timeFrame?: string;
    className?: string;
};

export async function TrendChart({
    // timeFrame = "monthly",
    className,
}: PropsType) {
    const data = await fetchOrderStatusStats();

    return (
        <div
            className={cn(
                "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
        <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
            Order Trend
            </h2>

            {/* <PeriodPicker defaultValue={timeFrame} sectionKey="used_devices" /> */}
        </div>

        <div className="grid place-items-center">
            <DonutChart data={data} title="Orders"/>
        </div>
        </div>
    );
}
