"use server";
import { getAllOrder, getPaidOrder } from "@gamezone/db";



export async function loadAllPaidOrder() {
    return await getAllOrder();
}
