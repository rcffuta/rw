// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { ProductItem } from "@gamezone/db";
import { Option } from "@/hooks/useCategories";
// import { getAllProductList } from "@/actions/product.action";


class ProductStore {
    quickView: ProductItem | null = null;
    productDetails: ProductItem | null = null;

    productItems: ProductItem[] = [];

    selectedCategory: Option | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedCategory(option?: Option) {
        this.selectedCategory = option;
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
