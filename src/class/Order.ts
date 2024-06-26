import { Prisma, PrismaClient } from "@prisma/client"
import { OrderProduct } from "./OrderProduct"
import unmask from "../tools/unmask"
import bozpay from "../api/bozpay"
import { Charge } from "../types/bozpay/Charge"
import { sendMail } from "../tools/mail"
import igest from "../api/igest"
import templates from "../templates"
import { IgestNewOrder } from "../types/igest/Order"

const prisma = new PrismaClient()
export const include = Prisma.validator<Prisma.OrderInclude>()({ products: true })
export type OrderPrisma = Prisma.OrderGetPayload<{ include: typeof include }>

export class Order {
    id: number
    storeId: number
    notes: string | null
    datetime: string
    total: number
    shippingPrice: number
    paymentType: string | null
    installments: number | null
    userId: number

    products: OrderProduct[]
    requestLog: string | null
    responseLog: string | null

    constructor(id: number, data?: OrderPrisma) {
        data ? this.load(data) : (this.id = id)
    }

    async init() {
        const order_prisma = await prisma.order.findUnique({ where: { id: this.id }, include })
        if (!order_prisma) throw "pedido não encontrado"
        this.load(order_prisma)
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
                name: `${data.name} ${data.lastname}`,
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
        this.shippingPrice = data.shippingPrice
        this.paymentType = data.paymentType
        this.installments = data.installments
        this.userId = data.userId
        this.requestLog = data.requestLog
        this.responseLog = data.responseLog

        this.products = data.products?.map((item) => new OrderProduct(item))
    }

    async update(data: Partial<Order>) {
        const order_prisma = await prisma.order.update({
            where: { id: this.id },
            data: {
                ...data,
                products: {},
            },
            include,
        })

        this.load(order_prisma)
    }

    async onPaid(charge: Charge) {
        const total = charge.amount.value / 100
        await this.update({
            paymentType: charge.payment_method.type,
            shippingPrice: total - this.total,
        })
    }

    async logPaidRequest(data: IgestNewOrder) {
        await this.update({ requestLog: JSON.stringify(data, null, 4) })
    }

    async logPaidResponse(data: any) {
        await this.update({ responseLog: JSON.stringify(data, null, 4) })
    }

    async getLogs() {
        return { request: JSON.parse(this.requestLog || "null"), response: JSON.parse(this.responseLog || "null") }
    }
}
