export interface Customer {
    id: string
    firstName: string
    lastName: string
    gender: string
    dateOfBirth: Date
    email: string
    phone: string
    address: string
    roleSet: {}

}

export interface CustomerResponse<T> {
    content: T[]
}
