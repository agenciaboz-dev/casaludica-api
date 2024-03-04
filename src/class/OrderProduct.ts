import { Prisma } from "@prisma/client"

export type OrderProductPrisma = Prisma.OrderProductGetPayload<{}>

export class OrderProduct {
    id: number
    name: string
    price: number
    quantity: number
    referenceId: number

    constructor(data: OrderProductPrisma) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.quantity = data.quantity
        this.referenceId = data.referenceId
    }
}
