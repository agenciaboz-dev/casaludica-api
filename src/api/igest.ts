import axios from "axios"

const token = "9aB4pC!qRt3xYz"
const version = 4

const api = axios.create({
    // baseURL: "http://localhost:4100/api",
    baseURL: "http://igestcasaludicacloud.ddns.net:6910/Genesis/IntegracaoBozWebRest",
    // timeout: 1000 * 10,
})

const get = async (endpoint: string, params: any) => {
    const paramsString = Object.entries(params)
        .map(([param, value]) => `${param}=${value}`)
        .join("&")
    const url = `${endpoint}?chave=${token}&versao=${version}&${paramsString}`

    return await (
        await api.get(url)
    ).data
}

const franchises = async (params: FranchiseParams) => (await get(`/ObterEmpresa`, params)) as Franchise[]
const categories = async (params: CategoryParams) => (await get("/ObterGrupo", params)) as Category[]
const products = async (params: ProductParams) => (await get("/ObterProduto", params)) as Product[]
const images = async (params: ImageParams) => (await get("/ObterImagem", params)) as Image

const getFunction = { franchises, products, images, categories }

export default { get: getFunction }
