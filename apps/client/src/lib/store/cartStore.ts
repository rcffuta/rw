// stores/CartStore.ts
import { 
  checkoutProduct,
  clearProductFromCart,
  loadCart,
  removeProductFromCart,
  updateProductInCart,
  saveCartItemToDb
} from "@/actions/cart.action";


import { OrderWithProduct, ProductItem } from "@gamezone/db";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import authStore from "./authStore";
import debounce from "lodash.debounce";


const LOCAL_CART_KEY = "guest_cart";

type LocalOrder = Partial<Pick<OrderWithProduct, "id">> & Omit<OrderWithProduct, "id">;

class CartStore {
    _items: LocalOrder[] = [];
    syncing: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    get items() {
        return this._items as OrderWithProduct[];
    }

    get totalPrice() {
        return this._items.reduce((total, item) => {
            return total + (item.product.discountedPrice || item.product.price) * item.quantity;
        }, 0);
    }

    saveToLocalStorage() {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(this._items));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem(LOCAL_CART_KEY);
        if (stored) {
            try {
            this._items = JSON.parse(stored);
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
            const serverOrders = await loadCart(authStore.user.id);

            runInAction(() => {
                const existingItemsMap = new Map<number, LocalOrder>();

                this._items.forEach(item => {
                    existingItemsMap.set(item.productId, item);
                });

                const mergedItems = serverOrders.map(serverItem => {
                    const localItem = existingItemsMap.get(serverItem.productId);
                    if (!localItem) return serverItem;

                    return new Date(localItem.updatedAt) > new Date(serverItem.updatedAt)
                    ? localItem
                    : serverItem;
                });

                const serverProductIds = new Set(serverOrders.map(item => item.productId));

                const remainingLocalItems = this._items.filter(
                    item => !serverProductIds.has(item.productId)
                );

                this._items = [...mergedItems, ...remainingLocalItems];

                
                runInAction(() => { this.syncing = true });
                this.syncCartWithServer(authStore.user.id, this._items as OrderWithProduct[]);
                runInAction(() => { this.syncing = false });
            });
        } catch (err) {
            console.error("Failed to reload cart:", err);
        }
    }


    private async syncCartWithServer(userId: number, items: OrderWithProduct[]) {
        try {
            await saveCartItemToDb(userId, toJS(items));
            console.debug("Cart successfully synced to backend.");
            this.clearLocalStorage();
        } catch (err) {
            console.error("Failed to sync cart with server:", err);
        }
    }

    async addItemToCart(product: ProductItem, quantity: number = 1) {
        const now = new Date();
        const existing = this._items.find(i => i.productId === product.id);

        if (existing) {
            runInAction(() => {
                existing.quantity += quantity;
                existing.updatedAt = now;
            });
        } else {
            runInAction(() => {
                this._items.push({
                    // id: Date.now() % 10,
                    paymentId: 0,
                    userId: authStore.user?.id || 0,
                    quantity,
                    product,
                    status: "cart",
                    productId: product.id,
                    createdAt: now,
                    updatedAt: now,
                });
            });
        }

        this.saveToLocalStorage();

        if (authStore.user) {
            this.debouncedReload();
        }
    }


    async removeItemFromCart(productId: number) {
        runInAction(() => {
            this._items = this._items.filter(item => item.productId !== productId);
        });

        if (authStore.user) {
            await removeProductFromCart(authStore.user.id, productId);
            this.debouncedReload();
        }
    }

    updateCartItemQuantity = debounce(async (productId: number, quantity: number) =>{
        if (quantity < 1) {
            await this.removeItemFromCart(productId);
            return;
        }

        const item = this._items.find(i => i.productId === productId);
        if (!item) return;

        runInAction(() => {
            item.quantity = quantity;
        });

        if (authStore.user) {
            await updateProductInCart(authStore.user.id, productId, quantity);
            await this.debouncedReload();
        }

    }, 300);

    async removeAllItemsFromCart() {
        runInAction(() => {
            this._items = [];
        });

        if (authStore.user) {
            await clearProductFromCart(authStore.user.id);
            await this.debouncedReload();
        }
    }

    async checkoutCart() {
        runInAction(() => {
            this._items = [];
        });


        if (authStore.user) {
            await checkoutProduct(authStore.user.id);
            await this.debouncedReload();
        }
        
    }

    getItemQuantity(productId: number): number {
        return this._items.find(i => i.productId === productId)?.quantity || 0;
    }
}

const cartStore = new CartStore();
export default cartStore;
