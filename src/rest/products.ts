import express, { Express, Request, Response } from "express"
import igest from "../api/igest"
import normalize from "../tools/normalize"
import axios from "axios"
import { Product } from "../class/Product"
import { Category } from "../class/Category"
const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body
    // console.log("requesting products from igest")

    try {
        const igestProducts = await igest.get.products({ empresa: data.franchise })
        let products = await Promise.all(igestProducts.map((item) => new Product(item)))

        if (data.search) {
            products = products.filter((product) => normalize(product.name).includes(normalize(data.search)))
        }

        if (data.category) {
            // console.log({ category: data.category })
            products = products.filter((product) => product.category == data.category)
        }

        if (data.collection) {
            // console.log({ collection: data.collection })
            const categories = (await axios.get("https://agencyboz.com:4100/api/categories")).data as Category[]
            const matched_categories = categories.filter((category) => category.collectionId == data.collection)
            // console.log(matched_categories)
            products = products.filter((product) => matched_categories.find((category) => category.id == product.category))
        }

        // console.log({ productsLength: products.length })

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
        const product = new Product(igestProducts[0])
        await product.getImage()
        response.json(product)
    } catch (error) {
        response.json({ error })
    }
})

router.post("/images", async (request: Request, response: Response) => {
    const data = request.body

    try {
        const images = await Product.getImages(data.id, !!data.mainOnly)
        response.json(images)
    } catch (error) {
        console.log(error)
        response.json({ error })
    }
})

export default router
