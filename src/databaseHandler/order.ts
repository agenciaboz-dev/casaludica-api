import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const include = { products: true }

const list = async (storeId?: number) => await prisma.order.findMany({ where: storeId ? { storeId } : undefined })

const get = async (id: number) => await prisma.order.findUnique({ where: { id }, include })

export default { include, list, get }
