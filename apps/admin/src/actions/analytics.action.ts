import { FetchedOrder } from "@gamezone/db";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData(): Promise<FetchedOrder> {
    // Fake delay
    // await new Promise((resolve) => setTimeout(resolve, 1400));

    return [];

    // const order = await prisma.order.findMany({ include: { items: true } });

    // return [
    //   {
    //     name: "Free package",
    //     price: 0.0,
    //     date: "2023-01-13T18:00:00.000Z",
    //     status: "Paid",
    //   },
    //   {
    //     name: "Standard Package",
    //     price: 59.0,
    //     date: "2023-01-13T18:00:00.000Z",
    //     status: "Paid",
    //   },
    //   {
    //     name: "Business Package",
    //     price: 99.0,
    //     date: "2023-01-13T18:00:00.000Z",
    //     status: "Unpaid",
    //   },
    //   {
    //     name: "Standard Package",
    //     price: 59.0,
    //     date: "2023-01-13T18:00:00.000Z",
    //     status: "Pending",
    //   },
    // ];

    // return order.map((each)=>({
    //     id: each.id,
    //     createdAt: each.createdAt,
    //     user: each.userId,
    //     status: each.status,
    //     item: each.items
    // }))
}
