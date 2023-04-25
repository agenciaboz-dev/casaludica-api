import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (request:Request, response:Response) => {    

    const products = await prisma.products.findMany({ include: { categories: { include: { colections: true } } }, orderBy: { featured: 'desc' } })    
    response.json(products)
})

router.post('/', async (request:Request, response:Response) => {    
    const data = request.body
    console.log(data)

    const products = await prisma.products.findMany({ where: { name: { search: data.search } }, include: { categories: { include: { colections: true } } }, orderBy: { featured: 'desc' } })    
    response.json(products)
})

router.post('/category', async (request:Request, response:Response) => {    
    const data = request.body
    console.log(data)

    const products = await prisma.products.findMany({ where: { category: data.id }, include: { categories: { include: { colections: true } } }, orderBy: { featured: 'desc' } })    
    console.log(products)
    response.json(products)

})

router.post('/collection', async (request:Request, response:Response) => {    
    const data = request.body
    console.log(data)

    const products = await prisma.products.findMany({ where: { category: { in: data.categories } }, include: { categories: { include: { colections: true } } }, orderBy: { featured: 'desc' } })
    console.log(products)
    response.json(products)
})

router.get('/popular', async (request:Request, response:Response) => {    

    const products = await prisma.products.findMany({ orderBy: [{ sold: 'desc' }, { featured: 'desc' }], take: 5, include: { categories: { include: { colections: true } } } })
    response.json(products)
})

export default router