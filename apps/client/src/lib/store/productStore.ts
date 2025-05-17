// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { ProductItem } from "@gamezone/db";
// import { getAllProductList } from "@/actions/product.action";

class ProductStore {
    quickView: ProductItem | null = null;
    productDetails: ProductItem | null = null;

    productItems: ProductItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    updateQuickView(product: ProductItem) {
        this.quickView = { ...product };
    }

    resetQuickView() {
        this.quickView = null;
    }

    updateProductDetails(product: ProductItem) {
        this.productDetails = { ...product };
    }
}

const productStore = new ProductStore();
export default productStore;
