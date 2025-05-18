import { getConversionRate, getTotalOrders, getTotalRevenue, getTotalUsers } from "@willo/db";

export async function getOverviewData() {

    const store = await getTotalOrders()
    const revenue = await getTotalRevenue()
    const users = await getTotalUsers()
    const conversionRate = await getConversionRate(users);

    return {
        sales: {
            label: "Total Sales",
            value: store,
            growthRate: 0,
        },
        revenue: {
            label:"Total Revenue",
            value: revenue,
            growthRate: 0,
        },
        users: {
            label: "Total User" + (users > 1 ? "s":""),
            value: users,
            growthRate: 0,
        },
        converserion: {
            label: "Conversion Rate",
            value: conversionRate,
            growthRate: 0,
        },
    };
}
