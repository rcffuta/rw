"use server";
import { getAllOrder, getPaidOrder } from "@willo/db";



export async function loadAllPaidOrder() {
    return await getAllOrder();
}
