import express, { Express, Request, Response } from "express"
import api from "./api/igest"
import { Category } from "./class/Category"

const router = express.Router()

router.get("/", async (request: Request, response: Response) => {
    try {
        const igestCategories = await api.get.categories({})
        console.log(igestCategories)
        const categories = igestCategories.map((category) => new Category(category))

        console.log(categories)
        response.json(categories)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router
