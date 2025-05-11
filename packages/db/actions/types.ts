import { Book, Category, Game, Order, Product, Review, Wishlist } from "../generated/client"

export type ProductFormData = Omit<Product, "id"|"createdAt">
// export type FetchedOrder = (Order & {items: OrderItem[]})[];

export type FullProduct = Product & {category: Category | null} & {reviews: Review[]}

export type FullBookProduct = Book & {product: Product};
export type FullGameProduct = Game & {product: Product};

export type FullWishList = Wishlist & {product: Product};

export type FullOrder = Order & {product: Product};
