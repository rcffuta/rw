// stores/WishlistStore.ts
import { clearAllInWishList, deleteFromWishList, loadWishList, saveWishList } from "@/actions/wishlist.action";
import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import { FullWishList, ProductItem } from "@willo/db";

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
    items: FullWishList[] = [];

    constructor() {
        makeAutoObservable(this);

        if (authStore.user) {

            loadWishList(authStore.user.id)
            .then((data)=>{
                this.items = data;
            })
            .catch((err)=>{
                console.error(err);
            })
        }
    }

    async addItem(product: ProductItem) {
        const existingItem = this.items.find((i) => i.productId === product.id);

        if (existingItem) {
            // existingItem.quantity += item.quantity;
            return
        }
        
        const data = await saveWishList(authStore.user.id, product.id);

        this.items.push({
            ...data,
            product
        })
    }

    async removeItem(productId: number) {

        let prod = false;

        this.items = this.items.filter((item) =>{
            if (item.productId === productId) {
                prod = true;
                return false;
            }
            // return item.id !== itemId
            return true;
        });

        if (prod) {
            await deleteFromWishList(authStore.user.id, productId);
        }
    }

    async clear() {
        await clearAllInWishList(authStore.user.id);
        this.items = [];
    }

    isItemInWishlist(id:number) {
        return Boolean(this.items.find((i) => i.id === id));
    }
}

const wishlistStore = new WishlistStore();
export default wishlistStore;
