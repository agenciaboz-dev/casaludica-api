import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import axios from "axios"
const router = express.Router()
const prisma = new PrismaClient()

const api = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 1000 * 10,
})

router.post("/", async (request: Request, response: Response) => {
  const data = request.body

  api.get(`/${data.cep.replace(/\D/g, "")}/json/`).then((result) => {
    response.json(result.data)
  })
})

export default router
