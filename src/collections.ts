import express, { Express, Request, Response } from "express"
import api from "./api/igest"

const router = express.Router()

export const buildCollection: (category: IgestCollection) => Collection = (collection) => ({
    id: collection.IdGrupoTitulo,
    name: collection.Descricao,
})

router.get("/", async (request: Request, response: Response) => {
    console.log("collections requested")
    try {
        const igestCollections = await api.get.collections({})
        console.log(igestCollections)
        const collections: Collection[] = igestCollections.map((collection) => buildCollection(collection))

        console.log(collections)
        response.json(collections)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router
