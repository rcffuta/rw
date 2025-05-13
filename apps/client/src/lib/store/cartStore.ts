// stores/CartStore.ts
import { 
  addProductToCart,
  checkoutProduct,
  clearProductFromCart,
  loadCart,
  removeProductFromCart,
  updateProductInCart 
} from "@/actions/cart.action";


import { FullOrder, ProductItem } from "@gamezone/db";
import { makeAutoObservable, runInAction } from "mobx";
import authStore from "./authStore";


// type FullOrder = any;
// type OrdStatus = any;
// type ProductItem = any;

class CartStore {
    items: FullOrder[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get totalPrice() {
        return this.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    }

    async reloadCart() {
        if (!authStore.user) return;

        try {
            const orders = await loadCart(authStore.user.id);
            runInAction(() => {
                this.items = orders;
            });
        } catch (err) {
            console.error("Failed to reload cart:", err);
        }
    }

    async addItemToCart(product: ProductItem, quantity: number = 1) {
        const existing = this.items.find(i => i.productId === product.id);

        if (existing) {
        runInAction(() => {
            existing.quantity += quantity;
        });
        } else {
        runInAction(() => {
            this.items.push({
                id: Date.now(),
                paymentId: 0,
                userId: 0,
                quantity: 0,
                product,
                status: "cart",
                productId: product.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            // this.items.push({
            // id: -1,
            // userId: authStore.user.id,
            // productId: product.id,
            // product,
            // quantity,
            // status: "cart",
            // createdAt: new Date(),
            // updatedAt: new Date()
            // });
        });
        }

        await addProductToCart(authStore.user.id, product.id, quantity);

        await this.reloadCart();
    }

    async removeItemFromCart(productId: number) {
        runInAction(() => {
        this.items = this.items.filter(item => item.productId !== productId);
        });

        await removeProductFromCart(authStore.user.id, productId);
        await this.reloadCart();
    }

    async updateCartItemQuantity(productId: number, quantity: number) {
        if (quantity < 1) {
        await this.removeItemFromCart(productId);
        return;
        }

        const item = this.items.find(i => i.productId === productId);
        if (!item) return;

        runInAction(() => {
        item.quantity = quantity;
        });

        await updateProductInCart(authStore.user.id, productId, quantity);
        await this.reloadCart();
    }

    async removeAllItemsFromCart() {
        runInAction(() => {
        this.items = [];
        });

        await clearProductFromCart(authStore.user.id);
        await this.reloadCart();
    }

    async checkoutCart() {
        runInAction(() => {
        this.items = [];
        });

        await checkoutProduct(authStore.user.id);
        await this.reloadCart();
    }

    getItemQuantity(productId: number): number {
        return this.items.find(i => i.productId === productId)?.quantity || 0;
    }
}

const cartStore = new CartStore();
export default cartStore;
