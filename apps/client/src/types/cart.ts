export type CartItem = {
  id: number;
  title: string;
  price: number;
  // discountedPrice: number;
  quantity: number;
  images: string[];
};

export type CartState = {
  items: CartItem[];
  // totalAmount: number;
}
