export interface Login {
    userName: string
    userPassword: string
}

export interface Register {
    firstName: string
    lastName: string
    gender: string
    dateOfBirth: Date
    phone: string
    email: string
    password: string
    status: number
    address: string
    role: []
}

export interface LoginResponse {
    message: string
    email: string
    token: string
}

export interface RegisterResponse {
    message: string
    email: string
}