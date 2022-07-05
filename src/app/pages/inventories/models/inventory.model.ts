import { Product } from "../../products/models/product.model"
import { Store } from "../../stores/models/store.model"

export interface Inventory {
    id: string
    product: Product
    store: Store
    productPrice: number
    stock: number
}

export interface InventoryResponse<T> {
    content: T[]
}