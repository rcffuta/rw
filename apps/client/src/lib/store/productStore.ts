// stores/ProductStore.ts
import { makeAutoObservable, toJS } from "mobx";
// import { ProductItem } from "@rw/shared";
import { Option } from "@/hooks/useCategories";
import { fetchPackages, getCategoryProducts, loadPackages, loadProducts } from "@/actions/product.action";
import { MerchPackage, MerchPackageRecord, ProductRecord } from "@rcffuta/ict-lib";
// import { getAllProductList } from "@/actions/product.action";

export const defaultOption = {
    label: "All Categories",
    value: "",
}

type ProductItem = ProductRecord;

class ProductStore {
    quickView: ProductItem | null = null;
    productDetails: ProductItem | null = null;

    _productItems: ProductItem[] = [];
    _packageItems: MerchPackageRecord[] = [];

    selectedCategory: Option = defaultOption;

    loading = false;
    loaded = false;

    constructor() {
        makeAutoObservable(this);
    }


    async initilizeStores() {
        await this.loadAllProducts();
    }


    set productItems(dat: ProductItem[]) {
        this._productItems = dat;
    }

    get productItems() {
        return toJS(this._productItems);
    }
    
    set packageItems(dat: MerchPackageRecord[]) {
        this._packageItems = dat;
    }
    get packageItems() {
        return toJS(this._packageItems);
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


    private async loadAllProducts(){
        if (this.loading) return;
        if (this.loaded) return;
        this.loading = true;

        const dt = await loadProducts();
        const pkgdt = await loadPackages();

        this.productItems = dt;
        this.packageItems = pkgdt;

        this.loading = false;
        this.loaded = dt.length > 0;
    }


    getProductItem(id: string) {
        return toJS(this.productItems).find(e=>e.id ==id)
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
