// lib/dummyStats.ts
type StatTimeFrame = any;

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper to generate random amounts between min and max
const randomAmount = (min: number, max: number) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

export type WeekStat = "last week" | "this week";

// Dummy payment data generator
const generateDummyPaymentData = (timeFrame: any) => {
  if (timeFrame === "yearly") {
    return Array.from({length: 12}, (_, i) => ({
      period: (i + 1).toString().padStart(2, "0"),
      received: randomAmount(5000, 20000),
      due: randomAmount(1000, 5000)
    }));
  } else {
    return Array.from({length: 12}, (_, i) => ({
      period: (i + 1).toString().padStart(2, "0"),
      received: randomAmount(1000, 5000),
      due: randomAmount(200, 1000)
    }));
  }
};

// Dummy weekly stats generator
const generateDummyWeeklyStats = () => {
  return dayNames.map((_, i) => ({
    dow: i,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: parseFloat((Math.random() * 5000 + 1000).toFixed(2))
  }));
};

// Dummy top products generator
const generateDummyTopProducts = (limit: number) => {
  const products = [
    "Anniversary T-Shirt", "RCF Hoodie", "Bible Cover", 
    "Wristband", "Cap", "Notebook", "Pen Set"
  ];
  
  return Array.from({length: limit}, (_, i) => ({
    id: `prod_${1000 + i}`,
    title: products[i % products.length],
    images: [`/products/product-${i % 7 + 1}.jpg`],
    totalsold: Math.floor(Math.random() * 100) + 20,
    totalrevenue: randomAmount(500, 5000)
  }));
};

// Dummy order status stats
const generateDummyOrderStats = () => {
  const statuses = ["paid", "disbursed", "cart", "pending"];
  return statuses.map(status => ({
    status,
    count: Math.floor(Math.random() * 50) + 10
  }));
};

// Refactored functions with dummy implementations
export async function getPaymentStatsChart(timeFrame: StatTimeFrame) {
  const raw = generateDummyPaymentData(timeFrame);

  if (timeFrame === "yearly") {
    return {
      received: raw.map((r) => ({ x: parseInt(r.period), y: parseFloat(r.received.toString()) })),
      due: raw.map((r) => ({ x: parseInt(r.period), y: parseFloat(r.due.toString()) })),
    };
  }

  const received: { x: string; y: number }[] = [];
  const due: { x: string; y: number }[] = [];

  for (let i = 1; i <= 12; i++) {
    const month = i.toString().padStart(2, "0");
    const label = monthLabels[i - 1];
    const found = raw.find((r) => r.period === month);

    received.push({ x: label, y: found ? parseFloat(found.received.toString()) : 0 });
    due.push({ x: label, y: found ? parseFloat(found.due.toString()) : 0 });
  }

  return { received, due };
}

export async function getWeeklyStats(timeFrame: StatTimeFrame = "this week") {
  const raw = generateDummyWeeklyStats();

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
  const raw = generateDummyTopProducts(limit);

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
  const raw = generateDummyOrderStats();

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