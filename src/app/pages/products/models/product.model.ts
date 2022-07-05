export interface Product {
    id: string
    name: string
    description: string
    productImage: string
}

export interface ProductsResponse<T> {
    content: T[]
}
