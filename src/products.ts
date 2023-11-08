import express, { Express, Request, Response } from 'express'
import { PrismaClient, products } from "@prisma/client"
import igest from "./api/igest"
import normalize from "./tools/normalize"
const router = express.Router()
const prisma = new PrismaClient()

const getProductImage = async (id: number, mainOnly?: boolean) => {
    const imagesObg = await igest.get.images({ produto: id, principal: !!mainOnly })
    const images = [imagesObg.Imagem1Base64, imagesObg.Imagem2Base64, imagesObg.Imagem3Base64, imagesObg.Imagem4Base64, imagesObg.Imagem5Base64]
        .filter(Boolean)
        .toString()

    return images
}

export const buildProduct = async (product: Product, getImage?: { mainOnly: boolean }) => {
    const images = getImage ? await getProductImage(product.IdProduto, getImage.mainOnly) : ""

    const builtProduct: products = {
        id: product.IdProduto,
        category: product.IdGrupo || 0,
        cover: images.split(",")[0] || "",
        date: product.DataAlteracao ? new Date(product.DataAlteracao) : null,
        description: product.Descricao || "",
        featured: false,
        height: product.Altura,
        lenght: product.Comprimento,
        width: product.Largura,
        images,
        name: product.Descricao || "",
        price: product.PrecoVenda,
        resume: product.Descricao || "",
        sold: product.TotalVenda,
        stock: product.EstoqueTotal,
        tags: product.Tags || "",
        weight: product.PesoBruto,
    }
    return builtProduct
}

router.post("/", async (request: Request, response: Response) => {
    const data = request.body
    console.log(data)
    console.log("requesting products from igest")

    try {
        const igestProducts = await igest.get.products({ empresa: data.franchise })
        let products = await Promise.all(igestProducts.map((item) => buildProduct(item)))

        if (data.search) {
            products = products.filter((product) => normalize(product.name).includes(normalize(data.search)))
        }

        console.log({ productsLength: products.length })

        response.json(products)
    } catch (error) {
        console.log(error)
        response.json({ error })
    }
})

router.post("/id", async (request: Request, response: Response) => {
    const data = request.body

    try {
        const igestProducts = await igest.get.products({ empresa: data.franchise, produto: data.id })
        const product = (await Promise.all(igestProducts.map((item) => buildProduct(item, { mainOnly: false }))))[0]
        console.log({ product })
        response.json(product)
    } catch (error) {
        response.json({ error })
    }
})

router.post("/images", async (request: Request, response: Response) => {
    const data = request.body
    console.log(data)

    try {
        const images = await getProductImage(data.id, !!data.mainOnly)
        response.json(images)
    } catch (error) {
        console.log(error)
        response.json({ error })
    }
})

router.post("/category", async (request: Request, response: Response) => {
    const data = request.body

    const products = await prisma.products.findMany({
        where: { category: data.id },
        include: { categories: { include: { colections: true } } },
        orderBy: { featured: "desc" },
    })
    response.json(products)
})

router.post("/collection", async (request: Request, response: Response) => {
    const data = request.body

    const products = await prisma.products.findMany({
        where: { category: { in: data.categories } },
        include: { categories: { include: { colections: true } } },
        orderBy: { featured: "desc" },
    })
    response.json(products)
})

router.get('/popular', async (request:Request, response:Response) => {    

    const products = await prisma.products.findMany({ orderBy: [{ sold: 'desc' }, { featured: 'desc' }], take: 5, include: { categories: { include: { colections: true } } } })
    response.json(products)
})

export default router