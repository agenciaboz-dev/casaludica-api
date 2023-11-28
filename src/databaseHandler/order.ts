import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const include = { products: true }

const list = async (storeId?: number) => await prisma.order.findMany({ where: storeId ? { storeId } : undefined })

const get = {
    id: async (id: number) => await prisma.order.findUnique({ where: { id }, include }),
    user: async (user_id: number) => await prisma.order.findMany({ where: { userId: user_id } })
}



export default { include, list, get }
