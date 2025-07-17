import { mockOrders } from "@/utils/orderUtils";
import { OrderRecord, OrderStatus } from "@rcffuta/ict-lib";
import { action, makeAutoObservable, runInAction, toJS } from "mobx";

type Order = OrderRecord;

export default class OrderStore {
    _orders: Order[] = [];
    loading = true;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    set orders(data: Order[]) {
        this._orders = data;
    }

    get orders(): Order[] {
        return toJS(this._orders);
    }

    updateOrderStatus(orderId: string, status: OrderStatus) {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            const updatedOrders = [...this.orders];
            updatedOrders[orderIndex] = {
                ...updatedOrders[orderIndex],
                status,
                updatedAt: new Date().toISOString()
            };
            this.orders = updatedOrders;
        } else {
            console.error("No Order with Id: " + orderId, {orderId, status})
        }
    }

    getOrdersByStatus(status: OrderStatus) {
        return this.orders.filter(order => order.status === status);
    }

    getOrderById(id: string) {
        return this.orders.find(order => order.id === id);
    }
}

// const orderStore = new OrderStore();
// export default orderStore;