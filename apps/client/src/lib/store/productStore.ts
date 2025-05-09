// stores/ProductStore.ts
import { makeAutoObservable } from "mobx";
import { Product } from "@/types/product";

class ProductStore {
  quickView: Product = this.createEmptyProduct();
  productDetails: Product = this.createEmptyProduct();

  constructor() {
    makeAutoObservable(this);
  }

  private createEmptyProduct(): Product {
    return {
      title: "",
      reviews: 0,
      price: 0,
      discountedPrice: 0,
      id: 0,
      imgs: { thumbnails: [], previews: [] },
    };
  }

  updateQuickView(product: Product) {
    this.quickView = { ...product };
  }

  resetQuickView() {
    this.quickView = this.createEmptyProduct();
  }

  updateProductDetails(product: Product) {
    this.productDetails = { ...product };
  }
}

const productStore = new ProductStore();
export default productStore;
