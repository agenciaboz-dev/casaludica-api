import express, { Express, Request, Response } from "express"
import { OrderProduct, PrismaClient } from "@prisma/client"
import bozpay from "./api/bozpay"
import { Order } from "./class/Order"
import { User } from "./class/User"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/list", async (request: Request, response: Response) => {
    const data = request.body
    const orders = await Order.list(data.storeId)

    response.json(orders)
})

router.post("/id", async (request: Request, response: Response) => {
    const data = request.body

    const orders = await Order.find({ id: Number(data.id) })
    const order = orders.length ? orders[0] : null
    response.json(order)
})

router.post("/user", async (request: Request, response: Response) => {
    const data = request.body

    const orders = await Order.find({ user_id: data.user_id })
    const bozpay_orders = await Promise.all(orders.map((order) => bozpay.order.get(bozpay.getStore(data.store_id), order.id.toString())))

    response.json({ orders: bozpay_orders })
})

router.post("/new", async (request: Request, response: Response) => {
    const data: ClientOrderForm = request.body

    const user_id = data.user_id || (await User.find(data.cpf, data.email))?.id || (await User.autoCreate(data)).id
    const order_response = await Order.new(data, user_id)

    response.json(order_response.error || { ...order_response })
})

export default router
