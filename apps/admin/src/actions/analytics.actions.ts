import { fetchPaymentStats, getOrderStatusStats, getTopSellingProducts, getWeeklyStatsFromDB, StatTimeFrame } from "@gamezone/db";


const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function getPaymentStatsChart(timeFrame: StatTimeFrame) {
    const raw = await fetchPaymentStats(timeFrame);

    if (timeFrame === "yearly") {
      return {
        received: raw.map((r: any) => ({ x: parseInt(r.period), y: parseFloat(r.received) })),
        due: raw.map((r: any) => ({ x: parseInt(r.period), y: parseFloat(r.due) })),
      };
    }

    // Ensure all months are represented
    const received: { x: string; y: number }[] = [];
    const due: { x: string; y: number }[] = [];

    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, "0");
      const label = monthLabels[i - 1];
      const found = raw.find((r: any) => r.period === month);

      received.push({ x: label, y: found ? parseFloat(found.received) : 0 });
      due.push({ x: label, y: found ? parseFloat(found.due) : 0 });
    }

    return { received, due };
}

export type WeekStat = "last week" | "this week";

export async function getWeeklyStats(timeFrame: StatTimeFrame = "this week") {
    const raw = await getWeeklyStatsFromDB(timeFrame);

    const salesMap: Record<number, number> = {};
    const revenueMap: Record<number, number> = {};

    for (const entry of raw) {
        const dow = Number(entry.dow);
        salesMap[dow] = Number(entry.sales);
        revenueMap[dow] = Number(entry.revenue);
    }

    return {
        sales: dayNames.map((day, i) => ({
            x: day,
            y: salesMap[i] || 0,
        })),
        revenue: dayNames.map((day, i) => ({
            x: day,
            y: revenueMap[i] || 0,
        })),
    };
}

export async function fetchTopSellingProducts(limit: number = 10) {
    const raw = await getTopSellingProducts(limit);

    return raw.map((item, index) => ({
        rank: index + 1,
        id: item.id,
        name: item.title,
        images: item.images,
        unitsSold: Number(item.totalsold),
        revenue: Number(item.totalrevenue),
    }));
}

export async function fetchOrderStatusStats() {
    const raw = await getOrderStatusStats();

    // Optional: prettify status names for labels if needed
    const formatStatus = (status: string) => {
        switch (status) {
        case "paid":
            return "Paid";
        case "disbursed":
            return "Disbursed";
        case "cart":
            return "In Cart";
        case "pending":
            return "Pending";
        default:
            return status;
        }
    };

    return raw.map((item) => ({
        label: formatStatus(item.status),
        value: item.count,
    }));
}
