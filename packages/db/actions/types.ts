import { Product } from "../generated/client"

export type ProductFormData = Omit<Product, "id"|"createdAt">