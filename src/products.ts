import express, { Express, Request, Response } from 'express'
import { PrismaClient } from "@prisma/client"
import igest from "./api/igest"
import normalize from "./tools/normalize"
import axios from "axios"
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

    const builtProduct: ClientProduct = {
        id: product.IdProduto,
        category: product.IdGrupo || 0,
        cover: images.split(",")[0] || "",
        date: product.DataAlteracao ? new Date(product.DataAlteracao) : undefined,
        description: product.DescricaoEducativa || "",
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
        ageRating: product.FaixaEtariaDescricao,
        brand: product.MarcaDescricao,
    }
    return builtProduct
}

router.post("/", async (request: Request, response: Response) => {
    const data = request.body
    console.log("requesting products from igest")

    try {
        const igestProducts = await igest.get.products({ empresa: data.franchise })
        let products = await Promise.all(igestProducts.map((item) => buildProduct(item)))

        if (data.search) {
            products = products.filter((product) => normalize(product.name).includes(normalize(data.search)))
        }

        if (data.category) {
            console.log({ category: data.category })
            products = products.filter((product) => product.category == data.category)
        }

        if (data.collection) {
            console.log({ collection: data.collection })
            const categories = (await axios.get("https://agencyboz.com:4100/api/categories")).data as Category[]
            const matched_categories = categories.filter((category) => category.collectionId == data.collection)
            console.log(matched_categories)
            products = products.filter((product) => matched_categories.find((category) => category.id == product.category))
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
        response.json(product)
    } catch (error) {
        response.json({ error })
    }
})

router.post("/images", async (request: Request, response: Response) => {
    const data = request.body

    try {
        const images = await getProductImage(data.id, !!data.mainOnly)
        response.json(images)
    } catch (error) {
        console.log(error)
        response.json({ error })
    }
})


export default router