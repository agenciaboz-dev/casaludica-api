import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createFromOrder = async (data: ClientOrderForm) =>
    await prisma.user.create({
        data: {
            address: data.address,
            city: data.city,
            cpf: data.cpf,
            district: data.district,
            email: data.email,
            lastname: data.lastname,
            name: data.name,
            number: data.number,
            phone: data.phone,
            postcode: data.postcode,
            state: data.state,
            company: data.company,
            complement: data.complement
        }
    })

export default { createFromOrder }
