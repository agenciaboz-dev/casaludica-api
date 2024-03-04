import express, { Express, Request, Response } from "express"
import { OrderProduct, PrismaClient } from "@prisma/client"
import unmask from "./tools/unmask"
import bozpay from "./api/bozpay"
import databaseHandler from "./databaseHandler"
import { Order } from "./class/Order"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/list", async (request: Request, response: Response) => {
    const data = request.body
    const orders = await databaseHandler.order.list(data.storeId)

    response.json(orders)
})

router.post("/id", async (request: Request, response: Response) => {
    const data = request.body

    const order = await databaseHandler.order.get.id(Number(data.id))
    response.json(order)
})

router.post("/user", async (request: Request, response: Response) => {
    const data = request.body

    const orders = await databaseHandler.order.get.user(data.user_id)
    const bozpay_orders = await Promise.all(orders.map((order) => bozpay.order.get(bozpay.getStore(data.store_id), order.id.toString())))

    response.json({ orders: bozpay_orders })
})

router.post("/new", async (request: Request, response: Response) => {
    const data: ClientOrderForm = request.body

    const order_response = await Order.new(data)

    response.json(order_response.error || { ...order_response })
})

export default router
