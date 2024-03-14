import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { authentication } from "../../middlewares/auth"
import { UploadedFile } from "express-fileupload"
import { Order } from "../../class/Order"
import { sendMail } from "../../tools/mail"
import { User } from "../../class/User"
import Mail from "nodemailer/lib/mailer"
const router = express.Router()
const prisma = new PrismaClient()

router.use(authentication)

router.put("/invoiced_order", async (request: Request, response: Response) => {
    try {
        const data = JSON.parse(request.body.data) as { order_id: number }
        const invoice = request.files?.file as UploadedFile

        if (!invoice) {
            response.status(400).json({ error: "your request formdata has no file" })
            return
        }

        if (!data.order_id) {
            response.status(400).json({ error: '"order_id" key is required in the request data' })
            return
        }

        if (typeof data.order_id != "number") {
            response.status(400).json({ error: '"order_id" key must be number' })
            return
        }

        const order = new Order(data.order_id)
        await order.init()
        const buyer = new User(order.userId)
        await buyer.init()

        const attachment: Mail.Attachment = {
            filename: invoice.name,
            content: invoice.data,
            contentType: invoice.mimetype,
        }

        await sendMail(buyer.email, "Seu Pedido foi Faturado - Nota Fiscal Anexa", "email em string", "<p>html</p>", [attachment])

        response.json(200)
    } catch (error) {
        if (error instanceof SyntaxError) {
            response
                .status(400)
                .json({ error: { name: error.name, message: error.message }, observations: "your request body is not JSON parseable." })
            return
        }

        console.log(error)
        response.status(500)
    }
})

export default router
