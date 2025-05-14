// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { ProductItem } from "@gamezone/db";

class ProductStore {
  quickView: ProductItem | null = null; //this.createEmptyProduct();
  productDetails: ProductItem | null = null; //this.createEmptyProduct();

  constructor() {
    makeAutoObservable(this);
  }

  private createEmptyProduct(): ProductItem {
    return {
      id: 0,
      title: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      images: [],
      categoryId: 1,
      createdAt: new Date(),
    };
  }

  updateQuickView(product: ProductItem) {
    this.quickView = { ...product };
  }

  resetQuickView() {
    this.quickView = null; //this.createEmptyProduct();
  }

  updateProductDetails(product: ProductItem) {
    this.productDetails = { ...product };
  }
}

const productStore = new ProductStore();
export default productStore;
