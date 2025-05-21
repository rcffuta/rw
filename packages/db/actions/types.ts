import { Book, Category,OrderStatus, Game, GiftCard, Order, Payment, Product, User, Wishlist } from "../generated/client"

export const OrdStatus = {
    ...OrderStatus
} as const;

export type ProductFormData = Omit<Product, "id"|"createdAt">
export type GameProductFormData = Omit<Game, "id"|"createdAt">
export type BookProductFormData = Omit<Book, "id"|"createdAt">
export type GiftCardProductFormData = Omit<GiftCard, "id"|"createdAt">
export type CategoryFormData = Omit<Category, "id">
// export type FetchedOrder = (Order & {items: OrderItem[]})[];

export type UserItem = User;

export type ProductItem = Product;
export type ProductWithCategory = Product & {category: Category | null};

export type FullBookProduct = Book & {product: Product};
export type FullGameProduct = Game & {product: Product};

export type FullWishList = Wishlist & {product: Product};

export type OrderItem = Order;
export type OrderWithProduct = Order & {product: Product};
export type OrderWithProductWithPayment = Order & {product: Product} & {payment: Payment | null};
export type OrderWithProductWithPaymentWithUser = OrderWithProductWithPayment & {user: User};

export type Categories = Category[] ;
export type CategoryItem = Category;
export type FullCategory = Category & {products: Product[]} ;

export type StatTimeFrame = "this week" | "last week" | "monthly" | "yearly";