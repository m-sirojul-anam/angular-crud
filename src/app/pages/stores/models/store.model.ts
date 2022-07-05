export interface Store {
    id: string
    noSiup: string
    name: string
    address: string
    phone: string
    email: string
}

export interface StoreResponse<T> {
    content: T[]
}