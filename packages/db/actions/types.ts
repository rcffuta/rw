import { Book, Category, Game, Order, Payment, Product, Review, Wishlist } from "../generated/client"

export {OrderStatus as OrdStatus } from "../generated/client";

export type ProductFormData = Omit<Product, "id"|"createdAt">
export type CategoryFormData = Omit<Category, "id">
// export type FetchedOrder = (Order & {items: OrderItem[]})[];

export type FullProduct = Product & {category: Category | null} & {reviews: Review[]}

export type FullBookProduct = Book & {product: Product};
export type FullGameProduct = Game & {product: Product};

export type FullWishList = Wishlist & {product: Product};

export type FullOrder = Order & {product: Product};
export type FullOrderWithPayment = Order & {product: Product} & {payment: Payment | null};

export type Categories = Category[] ;
export type CategoryItem = Category;
export type FullCategory = Category & {products: Product[]} ;

