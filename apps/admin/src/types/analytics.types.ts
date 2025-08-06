import { CustomerInfo, MerchPackageRecord, OrderRecord, ProductRecord } from "@rcffuta/ict-lib";

export type Stock = ProductRecord & MerchPackageRecord;
export type StockMap = {
    price: number,
    id: string,
    name: string,
    image: string,
    unitsSold: number,
    revenue: number,
};
export type StockSale = {
    price: number,
    rank: number,
    id: string,
    name: string,
    image: string,
    unitsSold: number,
    revenue: number,
};


export type GroupedOrdersByCustomer = {
    id: string;
    customer: CustomerInfo;
    orders: OrderRecord[];
    amount: number;
};
