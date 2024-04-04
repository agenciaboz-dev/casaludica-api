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
    const franchise = new Franchise(franchises.find((item) => item.Endereco.CodigoIbge == data.ibge && item.Ativo) || franchises[0])
    response.json(franchise)
})

export default router
