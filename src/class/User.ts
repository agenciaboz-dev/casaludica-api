import { Prisma, PrismaClient } from "@prisma/client"
import { UploadedFile } from "express-fileupload"
import { saveImage } from "../tools/saveImage"
import unmask from "../tools/unmask"
import { Order, include as order_include } from "./Order"

const prisma = new PrismaClient()

export const include = Prisma.validator<Prisma.UserInclude>()({ orders: { include: order_include } })
export type UserPrisma = Prisma.UserGetPayload<{ include: typeof include }>

export class User {
    id: number
    password: string | null
    name: string
    lastname: string
    cpf: string
    company: string | null
    postcode: string
    address: string
    number: string
    district: string
    complement: string | null
    city: string
    state: string
    phone: string
    email: string
    profilePicUrl: string

    orders: Order[] = []

    constructor(id: number, user_prisma?: UserPrisma) {
        user_prisma ? this.load(user_prisma) : (this.id = id)
    }

    static async list() {
        const users_prisma = await prisma.user.findMany({ include })
        const users = users_prisma.map((item) => new User(0, item))
        console.log(users)
        return users
    }

    static async login(login: string, password: string) {
        console.log("logging in")
        const user_prisma = await prisma.user.findFirst({ where: { OR: [{ email: login }, { cpf: login }], AND: { password } }, include })
        if (!user_prisma) return null

        const user = new User(0, user_prisma)
        return user
    }

    static async find(...params: string[]): Promise<User | null> {
        let user: User | null = null
        await Promise.all(
            params.map(async (param) => {
                const data = await prisma.user.findFirst({
                    where: { OR: [{ cpf: param }, { email: param }] },
                    include,
                })
                if (data) user = new User(0, data)
            })
        )

        return user
    }

    static async autoCreate(data: ClientOrderForm) {
        const user_prisma = await prisma.user.create({
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
                complement: data.complement,
            },
            include,
        })
        const user = new User(0, user_prisma)
        return user
    }

    async init() {
        const user_prisma = await prisma.user.findUnique({ where: { id: this.id }, include })
        if (!user_prisma) throw "usuário não encontrado"
        this.load(user_prisma)
    }

    load(user_prisma: UserPrisma) {
        this.id = user_prisma.id
        this.password = user_prisma.password
        this.name = user_prisma.name
        this.lastname = user_prisma.lastname
        this.cpf = user_prisma.cpf
        this.company = user_prisma.company
        this.postcode = user_prisma.postcode
        this.address = user_prisma.address
        this.number = user_prisma.number
        this.district = user_prisma.district
        this.complement = user_prisma.complement
        this.city = user_prisma.city
        this.state = user_prisma.state
        this.phone = user_prisma.phone
        this.email = user_prisma.email
        this.profilePicUrl = user_prisma.profilePicUrl
        this.orders = user_prisma.orders.map((item) => new Order(0, item))
    }

    async updateImage(file: UploadedFile) {
        const url = saveImage(`/users/${this.id}`, file.data, file.name)
        await prisma.user.update({ where: { id: this.id }, data: { profilePicUrl: url } })

        this.profilePicUrl = url
        return url
    }

    async update(data: Partial<User>) {
        const user_prisma = await prisma.user.update({
            where: { id: this.id },
            data: {
                ...data,
                orders: {},
            },
            include,
        })
        this.load(user_prisma)
    }
}
