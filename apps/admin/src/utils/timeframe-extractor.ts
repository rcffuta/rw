import { StatTimeFrame } from "@willo/db";

export function createTimeFrameExtractor(
  selectedTimeFrame: string | undefined,
) {
  return (sectionKey: string): StatTimeFrame | undefined => {
    return (selectedTimeFrame
      ?.split(",")
      .find((value) => value.includes(sectionKey)))?.split(":")[1] as StatTimeFrame | undefined;
  };
}
