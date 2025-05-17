import { StatChartTimeFrame } from "@/actions/analytics.actions";

export function createTimeFrameExtractor(
  selectedTimeFrame: string | undefined,
) {
  return (sectionKey: string): StatChartTimeFrame | undefined => {
    return (selectedTimeFrame
      ?.split(",")
      .find((value) => value.includes(sectionKey)))?.split(":")[1] as StatChartTimeFrame | undefined;
  };
}
