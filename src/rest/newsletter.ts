import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { sendMail } from "../tools/mail"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as { name: string; email: string }
    const newsletter = await prisma.newsletter.create({ data })
    await sendMail(newsletter.email, "assinado newsletter", "email texto", "<p>newsletter html</p>")
    response.status(200).json()
})

export default router
