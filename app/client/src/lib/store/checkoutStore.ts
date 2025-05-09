// stores/CheckoutStore.ts
import { makeAutoObservable } from "mobx";

export class CheckoutStore {
  address = {
    address: "",
    city: "",
    contact: "",
    country: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateAddress(newAddress: Partial<typeof this.address>) {
    this.address = {
      ...this.address,
      ...newAddress,
    };
  }
}

// Create a singleton instance (exported directly)
const checkoutStore = new CheckoutStore();
export default checkoutStore;
