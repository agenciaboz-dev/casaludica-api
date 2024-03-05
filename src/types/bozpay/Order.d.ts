declare interface BozPayOrder {
    order: OrderForm
    billing: BillShippingForm
    shipping: BillShippingForm
    products: ProductForm[]
}

declare interface OrderForm {
    referenceId: string
    store: string
    status: string
    dateCreated: string
    dateModified: string
    total: number
    customerId?: string
}

declare interface BillShippingForm {
    address: AddressForm
    personalData: PersonalDataForm
}

declare interface ProductForm {
    name: string
    price: number
    quantity: number
    referenceId: string | number
}

declare interface AddressForm {
    address: string
    number: string
    district: string
    city: string
    state: string
    postcode: string
    number: string
    complement?: string
}

declare interface PersonalDataForm {
    name: string
    cpf: string
    phone: string
    email: string
}
