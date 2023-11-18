import express, { Express, Request, Response } from "express"
import api from "./api/igest"

const router = express.Router()

export const buildColection: (category: IgestColection) => Colection = (colection) => ({
    id: colection.IdGrupoTitulo,
    name: colection.Descricao,
})

router.get("/", async (request: Request, response: Response) => {
    try {
        const igestColections = await api.get.colections({})
        console.log(igestColections)
        const colections: Colection[] = igestColections.map((colection) => buildColection(colection))

        console.log(colections)
        response.json(colections)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router
