// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { ProductItem } from "@gamezone/db";
import { Option } from "@/hooks/useCategories";
import { getCategoryProducts } from "@/actions/product.action";
// import { getAllProductList } from "@/actions/product.action";

export const defaultOption = {
    label: "All Categories",
    value: "",
}

class ProductStore {
    quickView: ProductItem | null = null;
    productDetails: ProductItem | null = null;

    productItems: ProductItem[] = [];

    selectedCategory: Option = defaultOption;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedCategory(option: Option) {
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

    async getCategoryProductById(categoryId:number) {
        return await getCategoryProducts(categoryId);
    }
}

const productStore = new ProductStore();
export default productStore;
