import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (request:Request, response:Response) => {    

    const products = await prisma.products.findMany({ include: { categories: { include: { colections: true } } } })    
    response.json(products)
})

export default router