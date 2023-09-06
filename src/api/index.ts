import axios from "axios"

const token = "9aB4pC!qRt3xYz"
const version = 2

const api = axios.create({
    // baseURL: "http://localhost:4100/api",
    baseURL: "http://igestcasaludicacloud.ddns.net:6910/Genesis/IntegracaoBozWebRest",
    // timeout: 1000 * 10,
})

const get = async (endpoint: string, params: any) => {
    const paramsString = Object.entries(params)
        .map(([param, value]) => `${param}=${value}`)
        .join("&")
    console.log({ paramsString })
    const url = `${endpoint}?chave=${token}&versao=${version}&${paramsString}`
    console.log({ url })

    return await (
        await api.get(url)
    ).data
}

const franchises = async (params: FranchiseParams) => (await get(`/ObterEmpresa`, params)) as Franchise[]
const categories = async (params: CategoryParams) => (await get("/ObterGrupo", params)) as Category[]
const ages = async (params: AgeParams) => (await get("/ObterFaixaEtaria", params)) as Age[]
const brands = async (params: BrandParams) => (await get("/ObterFaixaEtaria", params)) as Brand[]
const variant = async (params: VariantParams) => (await get("/ObterVariacao", params)) as Variant[]
const products = async (params: ProductParams) => (await get("/ObterProduto", params)) as Product[]
const images = async (params: ImageParams) => (await get("/ObterImagem", params)) as Image
const stocks = async (params: StockParams) => (await get("/ObterEstoque", params)) as Stock[]
const prices = async (params: PriceParams) => (await get("/ObterPrecoVenda", params)) as Price[]
const etas = async (params: ETAParams) => (await get("/ObterPrazoEntrega", params)) as ETA[]

const getFunction = { franchises, categories, ages, brands, variant, products, images, stocks, prices, etas }

export default { get: getFunction }
