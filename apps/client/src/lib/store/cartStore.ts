// stores/CartStore.ts
import { 
  checkoutProduct,
  clearOrders,
  loadCart,
  updateCart,
  updateOrders,
} from "@/actions/cart.action";

import { makeAutoObservable, runInAction, toJS } from "mobx";
import authStore from "./authStore";
import debounce from "lodash.debounce";
import { Order, OrderItem, OrderRecord } from "@rcffuta/ict-lib";


const LOCAL_CART_KEY = "guest_cart";

type LocalOrder = OrderRecord;

class CartStore {
    _orders: LocalOrder[] = {} as any;
    syncing: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    get items() {
        return this._orders;
    }

    get orders() {
        return this._orders;
    }
    set orders(data: LocalOrder[]) {
        this._orders = data;
    }
    set items(data: LocalOrder[]) {
        this._orders = data;
    }


    get totalPrice() {
        return this.orders.reduce((prev,curr)=>{
            return prev += curr.totalAmount
        }, 0);
    }

    saveToLocalStorage() {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(this.orders));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem(LOCAL_CART_KEY);
        if (stored) {
            try {
            this.orders = JSON.parse(stored);
            } catch {
            console.warn("Failed to parse local cart");
            }
        }
    }

    clearLocalStorage() {
        localStorage.removeItem(LOCAL_CART_KEY);
    }


    private debouncedReload = debounce(() => this.reloadCart(), 500);

    async reloadCart() {
        if (!authStore.user) return;

        try {
            const {
                data:serverOrders,
                message,
                success
            } = await loadCart(authStore.user.email);

            if (!success) {
                console.error(message)
                return;
            }

            runInAction(() => {
                const existingItemsMap = new Map<string, OrderRecord>();

                this.orders.forEach(item => {
                    existingItemsMap.set(item.item.itemId, item);
                });

                const mergedItems = serverOrders.map(serverItem => {
                    const localItem = existingItemsMap.get(serverItem.item.itemId);
                    if (!localItem) return serverItem;

                    return new Date(localItem.updatedAt) > new Date(serverItem.updatedAt)
                    ? localItem
                    : serverItem;
                });

                const serverProductIds = new Set(serverOrders.map(item => item.item.itemId));

                const remainingLocalItems = this.orders.filter(
                    item => !serverProductIds.has(item.item.itemId)
                );

                this.orders = [...mergedItems, ...remainingLocalItems];

                
                runInAction(() => { this.syncing = true });
                // this.syncCartWithServer(authStore.user.id, this._items as OrderWithProduct[]);

                Promise.all(this.orders.map(e=>this.syncCartWithServer(e.id, e)))
                runInAction(() => { this.syncing = false });
            });
        } catch (err) {
            console.error("Failed to reload cart:", err);
        }
    }


    private async syncCartWithServer(orderId: string, order: Order) {
        try {
            await updateCart(orderId, toJS(order));
            console.debug("Cart successfully synced to backend.", {order});
            this.clearLocalStorage();
        } catch (err) {
            console.error("Failed to sync cart with server:", err, {order});
        }
    }

    async addItemToCart(product: OrderItem) {
        const now = new Date();
        const existing = this.orders.find(i => i.item.itemId === product.itemId);

        if (existing) {
            runInAction(() => {
                existing.item.quantity += product.quantity;
                existing.updatedAt = now.toDateString();
                existing.totalAmount = product.price * product.quantity
            });
        } else {
            runInAction(() => {
                this.orders.push({
                    // id: Date.now() % 10,
                    customer: {
                        email: authStore.user.email,
                        name: `${authStore.user.firstname} ${authStore.user.lastname}`,
                        phone: authStore.user.contacts,
                        userId: authStore.user.id
                    },
                    id: "",
                    item: product,
                    paymentRef: "",
                    status: "cart",
                    totalAmount: product.price * product.quantity,
                    createdAt: now.toDateString(),
                    updatedAt: now.toDateString(),
                });
            });
        }

        this.saveToLocalStorage();

        if (authStore.user) {
            this.debouncedReload();
        }
    }


    async removeItemFromCart(productId: string) {
        runInAction(() => {
            this.orders = this.orders.filter(item => item.item.itemId !== productId);
        });

        if (authStore.user) {
            await updateOrders(this.orders);
            this.debouncedReload();
        }
    }

    updateCartItemQuantity = debounce(async (productId: string, quantity: number) =>{
        if (quantity < 1) {
            await this.removeItemFromCart(productId);
            return;
        }

        const item = this.orders.find(i => i.item.itemId === productId);
        if (!item) return;

        runInAction(() => {
            item.item.quantity = quantity;
        });

        if (authStore.user) {
            await updateCart(item.id, item);
            await this.debouncedReload();
        }

    }, 300);

    async removeAllItemsFromCart() {
        runInAction(() => {
            this.orders = [];
        });

        if (authStore.user) {
            await clearOrders(authStore.user.id);
            await this.debouncedReload();
        }
    }

    async checkoutCart() {
        runInAction(() => {
            this.orders = [];
        });


        if (authStore.user) {
            await checkoutProduct(authStore.user.id);
            await this.debouncedReload();
        }
        
    }

    getItemQuantity(productId: string): number {
        return this.orders.find(i => i.item.itemId === productId)?.item.quantity || 0;
    }
}

const cartStore = new CartStore();
export default cartStore;
