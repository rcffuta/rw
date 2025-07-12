// lib/dummyOverview.ts

// Dummy data generator
const generateDummyOverview = () => {
  const baseSales = Math.floor(Math.random() * 500) + 100; // 100-600 sales
  const baseRevenue = baseSales * (Math.random() * 5000 + 1000); // 1000-6000 per sale
  const baseUsers = Math.floor(baseSales * (Math.random() * 2 + 0.5)); // 0.5-2.5x sales
  
  return {
    sales: baseSales,
    revenue: Math.floor(baseRevenue),
    users: baseUsers,
    conversionRate: parseFloat((Math.random() * 0.3 + 0.1).toFixed(2)) // 10-40%
  };
};

// Track previous values to calculate growth
let previousData = generateDummyOverview();

export async function getOverviewData() {
  // Generate new data with slight variations
  const currentData = generateDummyOverview();
  
  // Calculate growth rates
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };

  const growthRates = {
    sales: calculateGrowth(currentData.sales, previousData.sales),
    revenue: calculateGrowth(currentData.revenue, previousData.revenue),
    users: calculateGrowth(currentData.users, previousData.users),
    conversionRate: calculateGrowth(currentData.conversionRate, previousData.conversionRate)
  };

  // Update previous data
  previousData = currentData;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    sales: {
      label: "Total Sales",
      value: currentData.sales,
      growthRate: growthRates.sales,
    },
    revenue: {
      label: "Total Revenue",
      value: currentData.revenue,
      growthRate: growthRates.revenue,
    },
    users: {
      label: "Total User" + (currentData.users > 1 ? "s" : ""),
      value: currentData.users,
      growthRate: growthRates.users,
    },
    converserion: {
      label: "Conversion Rate",
      value: currentData.conversionRate,
      growthRate: growthRates.conversionRate,
    },
  };
}

// Dummy implementations of the original functions
export async function getTotalOrders() {
  const data = generateDummyOverview();
  return data.sales;
}

export async function getTotalRevenue() {
  const data = generateDummyOverview();
  return data.revenue;
}

export async function getTotalUsers() {
  const data = generateDummyOverview();
  return data.users;
}

export async function getConversionRate(users?: number) {
  const data = generateDummyOverview();
  return users ? parseFloat((data.sales / users).toFixed(2)) : data.conversionRate;
}