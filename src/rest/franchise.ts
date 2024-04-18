import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { CepResult } from "../types/viacep/CepResult"
import igest from "../api/igest"
import { Franchise } from "../class/Franchise"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as CepResult

    const franchises = await igest.get.franchises({})
    console.log(franchises)
    const franchise = new Franchise(franchises.find((item) => item.Endereco.CodigoIbge == data.ibge && item.Ativo) || (await igest.get.franchisor()))
    response.json(franchise)
})

router.post("/refresh", async (request: Request, response: Response) => {
    const data = request.body as { franchise_id: number }
    console.log("refreshing franchise")

    const igest_franchise = await igest.get.franchises({ empresa: data.franchise_id })
    const franchise = new Franchise(igest_franchise[0])
    response.json(franchise)
})

export default router
