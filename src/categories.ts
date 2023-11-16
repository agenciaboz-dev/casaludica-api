import express, { Express, Request, Response } from 'express'
import { PrismaClient } from "@prisma/client"
import api from "./api/igest"

const router = express.Router()
const prisma = new PrismaClient()

export const buildCategory: (category: IgestCategory) => Category = (category) => ({ id: category.IdGrupo, name: category.Descricao })

router.get("/", async (request: Request, response: Response) => {
    try {
        const igestCategories = await api.get.categories({})
        console.log(igestCategories)
        const categories: Category[] = igestCategories.map((category) => buildCategory(category))

        console.log(categories)
        response.json(categories)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router