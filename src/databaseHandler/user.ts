import { PrismaClient } from "@prisma/client"
import unmask from "../tools/unmask"

const prisma = new PrismaClient()
const include = { orders: true }

const existingUser = async (login: string) =>
    await prisma.user.findFirst({
        where: { OR: [{ cpf: login }, { email: login }] }
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

const login = async (login: string, password: string) =>
    await prisma.user.findFirst({ where: { OR: [{ email: login }, { cpf: login }], AND: { password } }, include })

const newPassword = async (id: number, password: string) => await prisma.user.update({ where: { id }, data: { password } })

export default { include, createFromOrder, list, existingUser, login, newPassword }
