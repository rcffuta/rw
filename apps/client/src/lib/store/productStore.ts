// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { FullProduct, Product } from "@gamezone/db";

class ProductStore {
  quickView: FullProduct | null = null; //this.createEmptyProduct();
  productDetails: Product | null = null; //this.createEmptyProduct();

  constructor() {
    makeAutoObservable(this);
  }

  private createEmptyProduct(): Product {
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

  updateQuickView(product: FullProduct) {
    this.quickView = { ...product };
  }

  resetQuickView() {
    this.quickView = null; //this.createEmptyProduct();
  }

  updateProductDetails(product: Product) {
    this.productDetails = { ...product };
  }
}

const productStore = new ProductStore();
export default productStore;
