// stores/WishlistStore.ts
import { makeAutoObservable } from "mobx";

export type WishListItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

class WishlistStore {
  items: WishListItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(item: WishListItem) {
    const existingItem = this.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(itemId: number) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  clear() {
    this.items = [];
  }
}

const wishlistStore = new WishlistStore();
export default wishlistStore;
