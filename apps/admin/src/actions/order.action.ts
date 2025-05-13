

type Prod = {
    image: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    date: Date,
};

export async function getUnResolvedOrder(): Promise<Prod[]> {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
        // {
        //     image: "/images/product/product-01.png",
        //     name: "Apple Watch Series 7",
        //     category: "Electronics",
        //     price: 296,
        //     quantity: 2,
        //     date: new Date("2025-05-01"),
        // },
    ];
}
