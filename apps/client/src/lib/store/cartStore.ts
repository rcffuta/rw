// stores/CartStore.ts
import { CartItem } from "@/types/cart";
import { makeAutoObservable } from "mobx";

// export interface CartItem {
//     id: number;
//     title: string;
//     price: number;
//     quantity: number;
//     discountedPrice: number;
//     imgs: string[];
// }

class CartStore {
    items: CartItem[] = [];

    constructor() {
        makeAutoObservable(this); // makes everything observable and actions
    }

    get totalPrice() {
        return this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
        }, 0);
    }

    addItemToCart(item: CartItem) {
        const existingItem = this.items.find((i) => i.id === item.id);

        if (existingItem) {
        existingItem.quantity += item.quantity;
        } else {
        this.items.push({ ...item });
        }
    }

    removeItemFromCart(id: number) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    updateCartItemQuantity(id: number, quantity: number) {
        const item = this.items.find((i) => i.id === id);

        if (!item) {
            return;
        }
        
        if (quantity < 1) {
            this.items = this.items.filter(e=>e.id !== id);
            return
        }

        item.quantity = quantity;
        
    }

    removeAllItemsFromCart() {
        this.items = [];
    }

    getItemQuantity(id:number) {
        return this.items.find((i) => i.id === id)?.quantity || 0;
    }
}

const cartStore = new CartStore();
export default cartStore;
