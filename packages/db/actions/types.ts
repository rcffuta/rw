import { Order, OrderItem, Product } from "../generated/client"

export type ProductFormData = Omit<Product, "id"|"createdAt">
export type FetchedOrder = (Order & {items: OrderItem[]})[];