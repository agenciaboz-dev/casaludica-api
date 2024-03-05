import express, { Express, Request, Response } from "express"
import api from "../api/igest"
import { Collection } from "../class/Collection"

const router = express.Router()

router.get("/", async (request: Request, response: Response) => {
    console.log("collections requested")
    try {
        const igestCollections = await api.get.collections({})
        console.log(igestCollections)
        const collections: Collection[] = igestCollections.map((collection) => new Collection(collection))

        console.log(collections)
        response.json(collections)
    } catch (error) {
        console.log(error)
        response.json([])
    }
})

export default router
