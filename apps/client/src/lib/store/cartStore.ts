// stores/cart-store.ts
import { makeAutoObservable, toJS } from "mobx";
import { OrderItem, OrderRecord, ProductRecord, ProductVariant, Order, MerchPackageRecord, PackageItem, OrderVariant } from "@rcffuta/ict-lib";
import { CheckoutFormData } from "../validators/checkout.validator";
import productStore from "./productStore";

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

  createProductOrderItem(product: ProductRecord): OrderItem {
    const firstVariant: ProductVariant = product.variants[0] || {
      color: "",
      image: "",
      sizes: [""],
    };

    return {
      itemId: product.id,
      itemType: "product",
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

  createPackageOrderItem(pkg: MerchPackageRecord): OrderItem {
    // const firstVariant: ProductVariant = pkg.items.at(0).variants[0] || {
    //   color: "",
    //   image: "",
    //   sizes: [""],
    // };

    const variant: OrderVariant[] = pkg.items.map(item => {
      const prod = productStore.getProductItem(item.productId);
      if (!prod) {
        return {
          color: "",
          size: "",
          image: "",
        };
      
      }

      const vart = prod.variants[0];

      const firstVariant: OrderVariant = {
        color: vart.color || "",
        size: vart.sizes[0] || "",
        image: vart.image || "",
      };

      return firstVariant;
    });

    return {
      itemId: pkg.id,
      itemType: "package",
      name: pkg.name,
      price: pkg.totalPrice,
      quantity: 1,
      variant,
    };
  }

  deleteFromCart(productId: string): void {
    this._order_items.delete(productId);
  }

  updateProductQuantity(quantity: number, product: ProductRecord): void {
    const item = this.getOrderItemById(product.id) || this.createProductOrderItem(product);

    this._order_items.set(product.id, {
      ...item,
      quantity: Math.max(1, quantity),
    });
  }

  updateVariant(variant: Partial<OrderVariant>, product: ProductRecord): void {
    const item = this.getOrderItemById(product.id) || this.createProductOrderItem(product);

    this._order_items.set(product.id, {
      ...item,
      itemType: "product",
      variant: {
        color: variant.color || (item.variant as OrderVariant).color || "",
        size: variant.size || (item.variant as OrderVariant).size || "",
        image: variant.image || (item.variant as OrderVariant).image || "",
      },
    });
  }

  setItemInCart(orderItem: OrderItem, productId: string) {

      this._order_items.set(productId, orderItem);
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
