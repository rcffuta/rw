// stores/cart-store.ts
import { makeAutoObservable, toJS } from "mobx";
import { OrderItem, OrderRecord, ProductRecord, ProductVariant, Order } from "@rcffuta/ict-lib";
import { CheckoutFormData } from "../validators/checkout.validator";

export type OrderType = "product" | "package";
export interface StoredCart {
  items: OrderItem[];
  order?: OrderRecord | null;
  billing?: CheckoutFormData | null;
}

export class CartStore {
  private _order_items = new Map<string, OrderItem>();
  private _order: OrderRecord | null = null;
  billing: CheckoutFormData | null = null;
  syncing = false;

  constructor(initial?: StoredCart) {
    makeAutoObservable(this);

    if (initial?.items) {
      this._order_items = new Map(initial.items.map((item) => [item.itemId, item]));
    }

    if (initial?.order) {
      this._order = initial.order;
    }

    if (initial?.billing) {
      this.billing = initial.billing;
    }
  }

  get order(): OrderRecord | null {
    return toJS(this._order);
  }

  set order(order: OrderRecord | null) {
    this._order = order;
  }

  get totalPrice(): number {
    return Array.from(this._order_items.values()).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  get items(): OrderItem[] {
    return Array.from(this._order_items.values()).map((item) => toJS(item));
  }

  get isEmptyCart(): boolean {
    return this._order_items.size === 0;
  }

  getOrderItemById(itemId: string): OrderItem | null {
    return this._order_items.get(itemId) || null;
  }

  createOrderItem(product: ProductRecord, itemType: OrderType): OrderItem {
    const firstVariant: ProductVariant = product.variants[0] || {
      color: "",
      image: "",
      sizes: [""],
    };

    return {
      itemId: product.id,
      itemType,
      name: product.name,
      price: product.price,
      quantity: 1,
      variant: {
        color: firstVariant.color,
        image: firstVariant.image,
        size: firstVariant.sizes[0] || "",
      },
    };
  }

  deleteFromCart(productId: string): void {
    this._order_items.delete(productId);
  }

  updateQuantity(quantity: number, product: ProductRecord, itemType: OrderType): void {
    const item = this.getOrderItemById(product.id) || this.createOrderItem(product, itemType);

    this._order_items.set(product.id, {
      ...item,
      quantity: Math.max(1, quantity),
    });
  }

  updateVariant(variant: Partial<OrderItem["variant"]>, product: ProductRecord, itemType: OrderType): void {
    const item = this.getOrderItemById(product.id) || this.createOrderItem(product, itemType);

    this._order_items.set(product.id, {
      ...item,
      variant: {
        ...item.variant,
        ...variant,
      },
    });
  }

  addToCart(product: ProductRecord, itemType: OrderType): boolean {
    // if (this._order_items.has(product.id)) return {
    //   this.ad
    // };

    const item = this.createOrderItem(product, itemType);
    this._order_items.set(product.id, item);
    return true;
  }

  get itemCount(): number {
    return this._order_items.size;
  }

  clearCart(): void {
    this._order_items.clear();
    this.billing = null;
    this._order = null;
  }

  setBilling(data: CheckoutFormData): void {
    this.billing = data;
  }

  setOrder(order: OrderRecord): void {
    this._order = order;
  }
}

// factory function
export function createCartStore(initial?: StoredCart) {
  return new CartStore(initial);
}
