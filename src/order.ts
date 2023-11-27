import express, { Express, Request, Response } from "express"
import { OrderProduct, PrismaClient } from "@prisma/client"
import unmask from "./tools/unmask"
import bozpay from "./api/bozpay"
import databaseHandler from "./databaseHandler"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/new", async (request: Request, response: Response) => {
    const data: ClientOrderForm = request.body

    try {
        const order = await prisma.order.create({
            data: {
                datetime: new Date().getTime().toString(),
                storeId: data.storeId,
                notes: data.notes,
                total: data.total,
                userId: data.user_id || (await databaseHandler.user.createFromOrder(data)).id,

                products: {
                    createMany: {
                        data: data.products.map((item) => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            referenceId: item.id
                        }))
                    }
                }
            },
            include: { products: true }
        })

        try {
            const address: AddressForm = {
                address: data.address,
                city: data.city,
                postcode: data.postcode,
                district: data.district,
                number: data.number,
                state: data.state,
                complement: data.complement
            }

            const personalData: PersonalDataForm = {
                cpf: unmask(data.cpf),
                email: data.email,
                name: data.name,
                phone: unmask(data.phone)
            }

            const bozpayOrder = await bozpay.order.new({
                billing: {
                    address,
                    personalData
                },
                shipping: {
                    address,
                    personalData
                },
                order: {
                    total: data.total,
                    referenceId: order.id.toString(),
                    dateCreated: order.datetime,
                    dateModified: order.datetime,
                    status: "PENDING",
                    store: `casaludica.mkt-${order.storeId}`
                },
                products: data.products.map((item) => ({ ...item, referenceId: item.id }))
            })

            response.json({ bozpayOrder: bozpayOrder.order, order })
        } catch (error) {
            console.log("bozpay error")
            console.log(error)
            response.json(error)
        }
    } catch (error) {
        console.log(error)
        response.json(error)
    }
})

export default router
