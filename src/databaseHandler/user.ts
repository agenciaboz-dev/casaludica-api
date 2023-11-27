import { PrismaClient } from "@prisma/client"
import unmask from "../tools/unmask"

const prisma = new PrismaClient()

const existingUser = async (data: ClientOrderForm) =>
    await prisma.user.findFirst({
        where: { OR: [{ cpf: data.cpf }, { email: data.email }] }
    })

const createFromOrder = async (data: ClientOrderForm) =>
    await prisma.user.create({
        data: {
            address: data.address,
            city: data.city,
            cpf: unmask(data.cpf),
            district: data.district,
            email: data.email,
            lastname: data.lastname,
            name: data.name,
            number: data.number,
            phone: unmask(data.phone),
            postcode: unmask(data.postcode),
            state: data.state,
            company: data.company,
            complement: data.complement
        }
    })

const list = async () => prisma.user.findMany()

export default { createFromOrder, list, existingUser }
