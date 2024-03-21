import express, { Express, Request, Response } from "express"
import { OrderProduct, PrismaClient } from "@prisma/client"
import bozpay from "../api/bozpay"
import { Order } from "../class/Order"
import { User } from "../class/User"
import igest from "../api/igest"
import { PaymentType } from "../types/igest/Order"
import viacep from "../api/viacep"
import { Charge } from "../types/bozpay/Charge"
import { AxiosError } from "axios"
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

    const user_id = data.user_id || (await User.find(data.cpf, data.email))?.id || (await User.autoCreate(data)).id
    console.log({ user_id })
    const order_response = await Order.new(data, user_id)

    response.json(order_response.error || { ...order_response })
})

router.post("/paid", async (request: Request, response: Response) => {
    const data = request.body as { charge: Charge; storeId: number }
    const charge = data.charge

    const bozpay_order = await bozpay.order.get(bozpay.getStore(data.storeId), "", Number(charge.reference_id))

    try {
        const order = new Order(Number(bozpay_order.referenceId))
        await order.init()
        await order.onPaid(charge)

        const user = new User(order.userId)
        await user.init()
        const via_cep = await viacep.search(user.postcode)

        const products_total = order.products.reduce((total, product) => total + product.price * product.quantity, 0)

        const igest_response = await igest.post.order({
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
        })
        if (igest_response.status == 200) {
            await bozpay.order.updateStatus({ status: "PROCESSANDO", id: bozpay_order.id })
        }
    } catch (error) {
        console.log("error sending to igest")

        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        } else {
            console.log(error)
        }
    }
})

export default router
