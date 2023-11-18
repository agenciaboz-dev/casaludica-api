import express, { Express, Request, Response } from "express"
import api from "./api/igest"

const router = express.Router()

export const buildCategory: (category: IgestCategory) => Category = (category) => ({
    id: category.IdGrupo,
    name: category.Descricao,
    collectionId: category.IdGrupoTitulo,
})

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
