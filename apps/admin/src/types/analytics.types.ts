import { MerchPackageRecord, ProductRecord } from "@rcffuta/ict-lib";

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
