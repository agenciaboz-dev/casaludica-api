export declare interface Charge {
    amount: {
        currency: string
        value: number
        summary: {
            total: number
            paid: number
            refunded: number
        }
    }

    created_at: string
    paid_at: string
    id: string
    payment_method: {
        type: string
    }
    reference_id: string
    status: string
}
