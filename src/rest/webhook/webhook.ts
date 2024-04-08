import express, { Express, Request, Response } from "express"
import { authentication } from "../../middlewares/auth"
import { UploadedFile } from "express-fileupload"
import { Order } from "../../class/Order"
import { sendMail } from "../../tools/mail"
import { User } from "../../class/User"
import Mail from "nodemailer/lib/mailer"
import bozpay from "../../api/bozpay"
import igest from "../../api/igest"
import templates from "../../templates"
const router = express.Router()

router.use(authentication)

router.patch("/delivered_order", async (request: Request, response: Response) => {
    const data = request.body as { order_id: number }

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

    const bozpay_order = await bozpay.order.get(bozpay.getStore(order.storeId), order.id.toString())
    const bozpay_response = await bozpay.order.updateStatus({ id: bozpay_order.id, status: "concluído" })
    console.log({ bozpay_response })

    const buyer = new User(order.userId)
    await buyer.init()

    sendMail(
        buyer.email,
        "Seu pedido da Casa Lúdica chegou! 🎉",
        templates.email.pedidoChegouClienteString(buyer, order),
        templates.email.pedidoChegouCliente(buyer, order)
    )
    igest.get.franchises({ empresa: order.storeId }).then((result) => {
        const franchise = result[0]
        sendMail(
            franchise.Email,
            `Confirmação de Entrega do Pedido - #${order.id}`,
            templates.email.pedidoChegouAdmString(buyer, order),
            templates.email.pedidoChegouAdm(buyer, order)
        )
    })

    response.status(200).json({ success: true })
})

router.patch("/sent_order", async (request: Request, response: Response) => {
    const data = request.body as { order_id: number }

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

    const bozpay_order = await bozpay.order.get(bozpay.getStore(order.storeId), order.id.toString())
    const bozpay_response = await bozpay.order.updateStatus({ id: bozpay_order.id, status: "Em trânsito" })
    console.log({ bozpay_response })

    const buyer = new User(order.userId)
    await buyer.init()

    sendMail(
        buyer.email,
        "Sua Compra Está a Caminho!",
        templates.email.pedidoConcluidoClienteString(buyer, order),
        templates.email.pedidoConcluidoCliente(buyer, order)
    )
    igest.get.franchises({ empresa: order.storeId }).then((result) => {
        const franchise = result[0]
        sendMail(
            franchise.Email,
            `Pedido Nº ${order.id} Concluído com Sucesso`,
            templates.email.pedidoConcluidoAdmString(buyer, order),
            templates.email.pedidoConcluidoAdm(buyer, order)
        )
    })

    response.status(200).json({ success: true })
})

router.patch("/invoiced_order", async (request: Request, response: Response) => {
    console.log("invoiced order")
    console.log(request.body)
    console.log(request.files)
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

        sendMail(
            buyer.email,
            "Seu Pedido foi Faturado - Nota Fiscal Anexa",
            templates.email.pedidoFaturadoClienteString(buyer, order),
            templates.email.pedidoFaturadoCliente(buyer, order),
            [attachment]
        )
        igest.get.franchises({ empresa: order.storeId }).then((result) => {
            const franchise = result[0]
            sendMail(
                franchise.Email,
                `Pedido Nº ${order.id} Faturado - Nota Fiscal Emitida`,
                templates.email.pedidoFaturadoAdmString(buyer, order),
                templates.email.pedidoFaturadoAdm(buyer, order),
                [attachment]
            )
        })

        response.status(200).json({ success: true })
    } catch (error) {
        if (error instanceof SyntaxError) {
            response
                .status(400)
                .json({ error: { name: error.name, message: error.message }, observations: "your request body is not JSON parseable." })
            return
        }

        console.log(error)
        response.status(500).json()
    }
})


export default router
