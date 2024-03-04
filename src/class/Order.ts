import { Prisma, PrismaClient } from "@prisma/client"
import { OrderProduct } from "./OrderProduct"
import unmask from "../tools/unmask"
import bozpay from "../api/bozpay"

const prisma = new PrismaClient()
export const include = Prisma.validator<Prisma.OrderInclude>()({ products: true })
export type OrderPrisma = Prisma.OrderGetPayload<{ include: typeof include }>

export class Order {
    id: number
    storeId: number
    notes: string | null
    datetime: string
    total: number
    paymentType: string | null
    installments: number | null
    userId: number

    products: OrderProduct[]

    constructor(id: number, data?: OrderPrisma) {
        data ? this.load(data) : (this.id = id)
    }

    static async list(store_id?: number) {
        const orders_prisma = await prisma.order.findMany({ where: { storeId: store_id }, include })
        const orders = orders_prisma.map((item) => new Order(0, item))
        return orders
    }

    static async find(data: { id?: number; user_id?: number }) {
        const order_prisma = await prisma.order.findMany({ where: { OR: { id: data.id, userId: data.user_id } }, include })
        const orders = order_prisma.map((item) => new Order(0, item))
        return orders
    }

    static async new(data: ClientOrderForm, user_id: number) {
        try {
            const order_prisma = await prisma.order.create({
                data: {
                    datetime: new Date().getTime().toString(),
                    storeId: data.storeId,
                    notes: data.notes,
                    total: data.total,
                    userId: user_id,

                    products: {
                        createMany: {
                            data: data.products.map((item) => ({
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                referenceId: item.id,
                            })),
                        },
                    },
                },
                include,
            })

            const order = new Order(0, order_prisma)

            const address: AddressForm = {
                address: data.address,
                city: data.city,
                postcode: data.postcode,
                district: data.district,
                number: data.number,
                state: data.state,
                complement: data.complement,
            }

            const personalData: PersonalDataForm = {
                cpf: unmask(data.cpf),
                email: data.email,
                name: data.name,
                phone: unmask(data.phone),
            }

            const bozpayOrder = await bozpay.order.new({
                billing: {
                    address,
                    personalData,
                },
                shipping: {
                    address,
                    personalData,
                },
                order: {
                    total: data.total,
                    referenceId: order.id.toString(),
                    dateCreated: order.datetime,
                    dateModified: order.datetime,
                    status: "PENDING",
                    store: bozpay.getStore(order.storeId),
                },
                products: data.products.map((item) => ({ ...item, referenceId: item.id })),
            })

            return { bozpayOrder: bozpayOrder.order, order }
        } catch (error) {
            console.log(error)
            return { error }
        }
    }

    load(data: OrderPrisma) {
        this.id = data.id
        this.storeId = data.storeId
        this.notes = data.notes
        this.datetime = data.datetime
        this.total = data.total
        this.paymentType = data.paymentType
        this.installments = data.installments
        this.userId = data.userId

        this.products = data.products?.map((item) => new OrderProduct(item))
    }
}
