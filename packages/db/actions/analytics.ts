import { prisma } from "../client";
import { OrdStatus, ProductItem, StatTimeFrame } from "./types";

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


export async function fetchPaymentStats(timeFrame: StatTimeFrame = "monthly") {
    const format = timeFrame === "yearly" ? "YYYY" : "MM";

    const stats = await prisma.$queryRawUnsafe<any[]>(`
        SELECT 
        to_char(o."createdAt", '${format}') AS period,
        SUM(
            CASE 
            WHEN o.status IN ('${OrdStatus.paid}', '${OrdStatus.disbursed}') 
            THEN 
                CASE 
                WHEN p."discountedPrice" IS NOT NULL AND p."discountedPrice" > 0 
                THEN p."discountedPrice" * o.quantity
                ELSE p.price * o.quantity
                END
            ELSE 0 
            END
        ) AS received,
        SUM(
            CASE 
            WHEN o.status = '${OrdStatus.cart}' 
            THEN 
                CASE 
                WHEN p."discountedPrice" IS NOT NULL AND p."discountedPrice" > 0 
                THEN p."discountedPrice" * o.quantity
                ELSE p.price * o.quantity
                END
            ELSE 0 
            END
        ) AS due
        FROM "Order" o
        JOIN "Product" p ON o."productId" = p.id
        GROUP BY period
        ORDER BY period;
    `);

    return stats;
}

export async function getWeeklyStatsFromDB(timeFrame: StatTimeFrame = "this week") {
    const today = new Date();

    const start = new Date();
    start.setDate(today.getDate() - (timeFrame === "this week" ? 6 : 13));
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(today.getDate() - (timeFrame === "this week" ? 0 : 7));
    end.setHours(23, 59, 59, 999);

    const results = await prisma.$queryRawUnsafe<any[]>(`
        SELECT
        to_char(o."createdAt", 'YYYY-MM-DD') AS date,
        EXTRACT(DOW FROM o."createdAt") AS dow,
        COUNT(*) AS sales,
        SUM(
            CASE 
            WHEN p."discountedPrice" IS NOT NULL AND p."discountedPrice" > 0 THEN p."discountedPrice" * o.quantity
            ELSE p.price * o.quantity
            END
        ) AS revenue
        FROM "Order" o
        JOIN "Product" p ON o."productId" = p.id
        WHERE o.status IN ('${OrdStatus.paid}', '${OrdStatus.disbursed}') AND o."createdAt" BETWEEN $1 AND $2
        GROUP BY date, dow
        ORDER BY date;
    `, start, end);

    return results;
}


export async function getTopSellingProducts(limit: number = 10) {
    const results = await prisma.$queryRawUnsafe<any[]>(`
        SELECT 
        p.id,
        p.title,
        p.images,
        SUM(o.quantity) AS totalSold,
        SUM(
            CASE 
            WHEN p."discountedPrice" IS NOT NULL AND p."discountedPrice" > 0 
            THEN p."discountedPrice" * o.quantity
            ELSE p.price * o.quantity
            END
        ) AS totalRevenue
        FROM "Order" o
        JOIN "Product" p ON o."productId" = p.id
        WHERE o.status IN ('${OrdStatus.paid}', '${OrdStatus.disbursed}')
        GROUP BY p.id, p."title", p."images"
        ORDER BY totalSold DESC
        LIMIT ${limit};
    `);

    return results;
}

export async function getOrderStatusStats() {
  const results = await prisma.$queryRawUnsafe<any[]>(`
    SELECT
      o.status,
      COUNT(*) AS count
    FROM "Order" o
    GROUP BY o.status
  `);

  return results.map((item) => ({
    status: item.status,
    count: Number(item.count),
  }));
}
