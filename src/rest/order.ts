import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bozpay from "../api/bozpay"
import { Order } from "../class/Order"
import { User } from "../class/User"
import igest from "../api/igest"
import { PaymentType } from "../types/igest/Order"
import viacep from "../api/viacep"
import { Charge } from "../types/bozpay/Charge"
import { AxiosError } from "axios"
import { sendMail } from "../tools/mail"
import templates from "../templates"

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

    response.json({ orders: bozpay_orders.filter((item) => !!item) })
})

router.post("/new", async (request: Request, response: Response) => {
    const data: ClientOrderForm = request.body

    const user_id =
        data.user_id ||
        (await User.find(data.cpf, data.email))?.id ||
        (await User.signup({ ...data, password: null, profilePicUrl: "", complement: data.complement || null }))?.id
    console.log({ user_id })

    if (user_id) {
        const order_response = await Order.new(data, user_id)
        response.json(order_response.error || { ...order_response })
    } else {
        response.json({ error: "nao foi possível localizar ou criar um usuário, revise os dados" })
    }
})

router.post("/paid", async (request: Request, response: Response) => {
    const data = request.body as { charge: Charge; storeId: number }
    const charge = data.charge

    const bozpay_order = await bozpay.order.get(bozpay.getStore(data.storeId), "", Number(charge.reference_id))

    const order = new Order(Number(bozpay_order.referenceId))
    await order.init()
    await order.onPaid(charge)

    const user = new User(order.userId)
    await user.init()

    try {
        console.log("sending new order mail to client")
        console.log({ destination: user.email })
        try {
            sendMail(
                user.email,
                "Novo pedido realizado!",
                templates.email.novoPedidoClienteString(user, order),
                templates.email.novoPedidoCliente(user, order)
            )
        } catch (error) {
            console.log("error sending new order mail to client")
            console.log(error)
        }
        console.log("sending new order mail to adm")
        igest.get.franchises({ empresa: data.storeId }).then((result) => {
            try {
                const franchisor = result[0]
                sendMail(
                    franchisor.Email,
                    "Nova Compra Realizada!",
                    templates.email.novoPedidoAdmString(user, order),
                    templates.email.novoPedidoAdm(user, order)
                )
            } catch (error) {
                console.log("error sending new order mail to adm")
                console.log(error)
            }
        })

        const via_cep = await viacep.search(user.postcode)

        const products_total = order.products.reduce((total, product) => total + product.price * product.quantity, 0)

        console.log("sending to igest")
        const igest_response = await igest.post.order(
            {
                IdEmpresa: order.storeId,
                IdentificadorPedido: order.id,
                TipoPagamento:
                    charge.payment_method.type == "PIX"
                        ? PaymentType.pix
                        : charge.payment_method.type == "BOLETO"
                        ? PaymentType.boleto
                        : PaymentType.cartao,
                ValorFrete: bozpay_order.total - products_total,
                Cliente: {
                    Bairro: user.district,
                    Cep: user.postcode,
                    Cidade: user.city,
                    CodigoIbge: via_cep.ibge,
                    Complemento: user.complement,
                    CpfCnpj: user.cpf,
                    Email: user.email,
                    Endereco: user.address,
                    Estado: user.state,
                    InscricaoEstadual: null,
                    Nome: user.name + " " + user.lastname,
                    Numero: user.number,
                    Rg: null,
                    Telefone: user.phone,
                },
                ListaProduto: order.products.map((item) => ({
                    IdProduto: item.referenceId,
                    PrecoVenda: item.price,
                    Quantidade: item.quantity,
                })),
            },
            order
        )
        if (igest_response.status == 200) {
            await bozpay.order.updateStatus({ status: "PROCESSANDO", id: bozpay_order.id })
            try {
                console.log("sending paid order email to client")
                console.log({ destination: user.email })
                sendMail(
                    user.email,
                    "Sua Compra Está Sendo Preparada!",
                    templates.email.processandoPedidoClienteString(user, order),
                    templates.email.processandoPedidoCliente(user, order)
                )
            } catch (error) {
                console.log("error sending paid order to client")
                console.log(error)
            }

            console.log("sending paid order to adm")
            igest.get.franchises({ empresa: order.storeId }).then((result) => {
                const franchise = result[0]
                try {
                    sendMail(
                        franchise.Email,
                        `Confirmado Pagamento - Pedido Nº ${order.id}`,
                        templates.email.processandoPedidoAdmString(user, order),
                        templates.email.processandoPedidoAdm(user, order)
                    )
                } catch (error) {
                    console.log("error sending paid order to adm")
                    console.log(error)
                }
            })
        }
    } catch (error) {
        console.log("error sending to igest")

        if (error instanceof AxiosError) {
            await order.logPaidResponse(error.response)
            console.log(error.response?.data)
        } else {
            console.log(error)
        }
    }
})

router.post("/confirm_receiving", async (request: Request, response: Response) => {
    const data = request.body as { bozpay_id: number; reference_id: string }
    const url = igest.getUrl("/EnviarEntrega")
    const receiving_date = JSON.stringify(new Date()).split("T")[0].replace('"', "")
    console.log(receiving_date)
    console.log("confirming receivement to igest")
    const igest_reponse = await igest.api.post(url, { IdentificadorPedido: data.reference_id, DataEntrega: receiving_date })
    console.log(igest_reponse.status)

    console.log("updating status on bozpay")
    const bozpay_response = await bozpay.order.updateStatus({ id: data.bozpay_id, status: "Concluído" })
    console.log({ bozpay_response })

    response.status(200).json()
})

router.post("/review", async (request: Request, response: Response) => {
    const data = request.body as { ratings: { id: number; rating: number }[] }

    const url = igest.getUrl("/EnviarAvaliacao")

    await Promise.all(
        data.ratings.map(async (rating) => {
            try {
                const igest_response = await igest.api.post(url, { IdProduto: rating.id, Nota: rating.rating })
                console.log(igest_response.status)
            } catch (error) {
                console.log(error)
            }
        })
    )

    response.status(200).json()
})

router.get("/logs", async (request: Request, response: Response) => {
    const order_id = request.query.order_id as string | undefined

    if (order_id) {
        try {
            const order = new Order(Number(order_id))
            await order.init()
            const logs = await order.getLogs()
            response.json(logs)
        } catch (error) {
            console.log(error)
            response.status(500).send(error)
        }
    } else {
        response.status(400).send("order_id param is required")
    }
})

export default router
