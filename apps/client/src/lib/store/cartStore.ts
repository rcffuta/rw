
import { makeAutoObservable, toJS } from "mobx";
import { OrderItem, ProductRecord, ProductVariant } from "@rcffuta/ict-lib";


const LOCAL_CART_KEY = "guest_cart";

class CartStore {
    private _order_items = new Map<string, OrderItem>();
    syncing: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }



    get totalPrice() {
        return Array.from(this._order_items.values())
            .reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    get items() {
        return toJS(Array.from(this._order_items.values()))
    }
    get isEmptyCart() {
        return this.items.length < 1;
    }

    saveToLocalStorage() {
        localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(this._order_items));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem(LOCAL_CART_KEY);
        if (stored) {
            try {
                const orderItems: OrderItem[] = JSON.parse(stored);

                orderItems.forEach(element => {
                    this._order_items.set(element.itemId, element);
                });
            } catch {
                console.warn("Failed to parse local cart");
            }
        }
    }

    clearLocalStorage() {
        localStorage.removeItem(LOCAL_CART_KEY);
    }

    getOrderItemById(itemId: string): OrderItem | null {
        const item = this._order_items.get(itemId);

        return item;
    }

    createOrderItem(product: ProductRecord, itemType: OrderType): OrderItem {
        const firstProduct: ProductVariant = product.variants.at(0);
        return {
            itemId: product.id,
            itemType,
            name: product.name,
            price: product.price,
            quantity: 1,
            variant: {
                color: firstProduct.color,
                image: firstProduct.image,
                size: firstProduct.sizes.at(0) || ""
            }
        }
    }


    deleteFromCart(productId:string) {
        this._order_items.delete(productId)
    }


    updateQuantity(quantity:number, product: ProductRecord, itemType: OrderType) {

        const item = this.getOrderItemById(product.id);
        let itemData: OrderItem = item;
        
        if (!itemData) {
            itemData = this.createOrderItem(product, itemType);
        }

        this._order_items.set(product.id, {
            ...itemData,
            quantity
        })
    }

    updateVariant(variant:Partial<OrderItem["variant"]>, product: ProductRecord, itemType: OrderType) {

        const item = this.getOrderItemById(product.id);
        let itemData: OrderItem = item;
        
        if (!itemData) {
            itemData = this.createOrderItem(product, itemType);
        }

        this._order_items.set(product.id, {
            ...itemData,
            variant: {
                ...itemData.variant,
                ...variant
            }
        })
    }

}

const cartStore = new CartStore();
export default cartStore;


export type OrderType = "product" | "package";