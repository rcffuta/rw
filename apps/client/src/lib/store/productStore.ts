// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
// import { ProductItem } from "@rw/shared";
import { Option } from "@/hooks/useCategories";
import { fetchPackages, getCategoryProducts } from "@/actions/product.action";
// import { getAllProductList } from "@/actions/product.action";

export const defaultOption = {
    label: "All Categories",
    value: "",
}

type ProductItem = any;

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

    async getPackage(categoryId:string) {
        return await getCategoryProducts(categoryId);
    }

    async getProductsInCategory(categoryType:"product" | "package", prodId:string) {
        return await fetchPackages(categoryType, prodId);
    }
}

const productStore = new ProductStore();
export default productStore;
