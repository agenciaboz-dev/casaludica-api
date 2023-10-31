import express, { Express, Request, Response } from 'express'
import { PrismaClient, categories } from "@prisma/client"
import api from "./api/igest"
const router = express.Router()
const prisma = new PrismaClient()

export const buildCategory: (category: Category) => categories = (category) => ({ colection: 1, id: category.IdGrupo, name: category.Descricao })

router.get("/", async (request: Request, response: Response) => {
    try {
        const igestCategories = await api.get.categories({})
        console.log(igestCategories)
        const categories: categories[] = igestCategories.map((category) => buildCategory(category))

        console.log(categories)
        response.json(categories)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router