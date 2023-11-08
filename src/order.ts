import express, { Express, Request, Response } from "express"
import { OrderProduct, PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/new", async (request: Request, response: Response) => {
    const data = request.body

    try {
        const order = await prisma.order.create({
            data: {
                address: data.address,
                city: data.city,
                datetime: new Date().getTime().toString(),
                email: data.email,
                lastname: data.lastname,
                name: data.name,
                phone: data.phone,
                postcode: data.postcode,
                storeId: data.storeId,
                company: data.company,
                notes: data.notes,
                total: data.total,

                products: {
                    createMany: {
                        data: data.products.map((item: OrderProduct) => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                    },
                },
            },
            include: { products: true },
        })

        response.json(order)
    } catch (error) {
        console.log(error)
        response.json(error)
    }
})

export default router
