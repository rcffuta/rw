import { prisma } from "../client";
import { OrdStatus } from "./types";

// Get total number of orders
export async function getTotalOrders() {
    try {

        return await prisma.order.count({
            where: {
                status: {
                    in: [OrdStatus.paid, OrdStatus.disbursed],
                },
            },
        });
    } catch (err) {
        console.error(err);
        return 0;
    }
}

// Get total revenue (sum of all product prices * quantity)
export async function getTotalRevenue() {
    try {

        const orders = await prisma.order.findMany({
            where: {
                status: {
                    in: [OrdStatus.paid, OrdStatus.disbursed],
                },
            },
            include: {
                product: true,
            },
        });
    
        return orders.reduce((total, order): number => {
            
            const {price:normPrice, discountedPrice} = order.product
            
            let price = normPrice;

            if ((discountedPrice > 0) && (discountedPrice < normPrice)) {
                price = discountedPrice

            }
            return total + price * order.quantity;
        }, 0);
    } catch(err) {
        console.error(err);
        return 0
    }
}

// Get unique users who placed at least one paid/disbursed order
export async function getTotalUsers() {
    try {

        const users = await prisma.order.findMany({
            where: {
                status: {
                    in: [OrdStatus.paid, OrdStatus.disbursed],
                },
            },
            select: {
                userId: true,
            },
            distinct: ["userId"],
        });
    
        return users.length;
    } catch(err) {
        console.error(err);
        return 0
    }
}

// Get orders grouped by status
export async function getOrdStatusBreakdown() {
    // const allStatuses = Object.values(OrdStatus);
    const breakdown: Record<"cart" | "paid" | "disbursed" | "cancelled", number> = {
        cart: 0,
        paid: 0,
        disbursed: 0,
        cancelled: 0,
    };

    const orders = await prisma.order.groupBy({
        by: ["status"],
        _count: true,
    });

    for (const item of orders) {
        breakdown[item.status] = item._count;
    }

    return breakdown;
}

// Get conversion rate
export async function getConversionRate(totalVisitors: number) {
    try {

        if (!totalVisitors || totalVisitors === 0) return 0;
    
        const totalOrders = await getTotalOrders();
        return (totalOrders / totalVisitors) * 100;
    } catch(err) {
        console.error(err);
        return 0
    }
}

// (Optional) Get revenue grouped by day/week/month for a chart
export async function getRevenueOverTime(granularity: "day" | "month" = "day") {
    const groupBy = granularity === "day" ? "%Y-%m-%d" : "%Y-%m";

    const results = await prisma.$queryRawUnsafe<any[]>(`
        SELECT
        to_char("createdAt", '${groupBy}') AS period,
        SUM(p.price * o.quantity) AS total
        FROM "Order" o
        JOIN "Product" p ON o."productId" = p.id
        WHERE o.status IN ('paid', 'disbursed')
        GROUP BY period
        ORDER BY period ASC;
    `);

    return results;
}
