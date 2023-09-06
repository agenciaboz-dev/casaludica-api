import express, { Express, Request, Response } from 'express'
import { PrismaClient, categories } from "@prisma/client"
import api from "./api"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/", async (request: Request, response: Response) => {
    try {
        const igestCategories = await api.get.categories({})
        const categories: categories[] = igestCategories.map((category) => ({ colection: 1, id: category.IdGrupo, name: category.Descricao }))

        console.log(categories)
        response.json(categories)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router