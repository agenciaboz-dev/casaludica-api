import axios from "axios"
import { IgestNewOrder } from "../types/igest/Order"
import { Order } from "../class/Order"

const token = "9aB4pC!qRt3xYz"
const version = 11

const api = axios.create({
    // baseURL: "http://localhost:4100/api",
    baseURL: "http://igestcasaludicacloud.ddns.net:6910/Genesis/IntegracaoBozWebRest",
    // timeout: 1000 * 10,
})

const getUrl = (endpoint: string) => {
    const url = `${endpoint}?chave=${token}&versao=${version}`
    return url
}

const get = async (endpoint: string, params: any) => {
    const base_url = getUrl(endpoint)
    const paramsString = Object.entries(params)
        .map(([param, value]) => `${param}=${value}`)
        .join("&")

    const url = `${base_url}&${paramsString}`

    return await (
        await api.get(url)
    ).data
}

const franchises = async (params: FranchiseParams) => (await get(`/ObterEmpresa`, params)) as IgestFranchise[]
const categories = async (params: CategoryParams) => (await get("/ObterGrupo", params)) as IgestCategory[]
const collections = async (params: IgestCollectionParams) => (await get("/ObterGrupoTitulo", params)) as IgestCollection[]
const products = async (params: ProductParams) => (await get("/ObterProduto", params)) as IgestProduct[]
const images = async (params: ImageParams) => {
    try {
        return (await get("/ObterImagem", params)) as Image
    } catch (error) {}
}

const order = async (data: IgestNewOrder, order: Order) => {
    console.log(data)
    await order.logPaidRequest(data)
    console.log("sending to igest")
    const url = getUrl("/EnviarPedido")
    const response = await api.post(url, data)
    return response
}

const franchisor = async () => {
    const list = (await get(`/ObterEmpresa`, { empresa: 2 })) as IgestFranchise[]
    return list[0]
}

const getFunction = { franchises, products, images, categories, collections, order, franchisor }

const post = { order }

export default { get: getFunction, post, token, getUrl, api }
