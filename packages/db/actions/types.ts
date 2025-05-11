import { Category, Order, OrderItem, Product, Review } from "../generated/client"

export type ProductFormData = Omit<Product, "id"|"createdAt">
export type FetchedOrder = (Order & {items: OrderItem[]})[];

export type FullProduct = Product & {category: Category | null} & {reviews: Review[]}