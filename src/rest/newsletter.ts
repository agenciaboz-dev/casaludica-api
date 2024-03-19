import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as { name: string; email: string }
    const newsletter = await prisma.newsletter.create({ data })
    response.status(200)
})

export default router
