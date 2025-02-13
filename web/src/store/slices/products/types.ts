import { Product } from "../../../types/index"

export interface GetProductsResponse {
    products: Product[];
}

export interface ProductRequest {
    name: string,
    description: string,
    quantity: number,
    price: number
}