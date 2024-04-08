import express, { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import { User } from "../class/User"
import { decrypt, encrypt } from "../tools/hash"
import { sendMail } from "../tools/mail"
import templates from "../templates"
import unmask from "../tools/unmask"
import { handlePrismaError } from "../prisma_errors"
const router = express.Router()

router.post("/exists", async (request: Request, response: Response) => {
    const data = request.body

    const user = await User.find(data.login)
    console.log(user)
    response.json(user)

    if (user && !user.password) {
        try {
            const hash = encrypt(user.id)
            const url = `https://lojas.casaludica.com.br/first_password/${hash}`
            await sendMail(
                user.email,
                "Gerar senha",
                templates.email.generate_password_string(user, url),
                templates.email.generate_password(user, url)
            )
        } catch (error) {
            console.log(error)
        }
    }
})

router.post("/new_password", async (request: Request, response: Response) => {
    const data = request.body as { id: number; password: string }

    try {
        const user = new User(data.id)
        await user.init()
        await user.update({ password: data.password })

        response.json(user)
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
})

router.post("/first_password", async (request: Request, response: Response) => {
    const data = request.body as { hash: string; password: string }

    try {
        const user_id = decrypt(data.hash)
        const user = new User(user_id)
        await user.init()

        if (!!user.password) {
            response.json(null)
            return
        }

        await user.update({ password: data.password })
        response.json(user)
    } catch (error) {
        response.json(null)
    }
})

router.get("/list", async (request: Request, response: Response) => {
    const users = await User.list()
    response.json(users)
})

router.post("/upload_profile_pic/:user_id", async (request: Request, response: Response) => {
    const user_id = Number(request.params.user_id)
    const file = request.files?.file

    if (file) {
        try {
            const user = new User(user_id)
            await user.init()
            await user.updateImage(file as UploadedFile)

            response.json(user)
        } catch (error) {
            console.log(error)
            response.status(500).send(error)
        }
    }
})

router.post("/login", async (request: Request, response: Response) => {
    const data = request.body as { login: string; password: string }

    const user = await User.login(data.login, data.password)
    response.json(user)
})

router.post("/update", async (request: Request, response: Response) => {
    const data = request.body as Partial<User> & { id: number }
    const user = new User(data.id)
    await user.init()

    try {
        await user.update(data)
        response.json(user)
    } catch (error) {
        console.log(error)
        response.status(500)
    }
})

router.post("/find", async (request: Request, response: Response) => {
    const data = request.body as { cpf: string; email: string }
    console.log(data)

    const user = await User.find(data.cpf, data.email)
    console.log(user)

    response.json(user?.id)
})

router.post("/signup", async (request: Request, response: Response) => {
    const data = request.body as { email: string; password: string; cpf: string }
    console.log(data)
    try {
        const user = await User.signup({
            address: "",
            city: "",
            company: "",
            complement: "",
            cpf: unmask(data.cpf),
            district: "",
            email: data.email,
            lastname: "",
            name: data.email.split("@")[0],
            number: "",
            password: data.password,
            phone: "",
            postcode: "",
            profilePicUrl: "",
            state: "",
        })
        if (user) {
            response.json(user)
        } else {
            response.status(500).send("Não foi possível criar o usuário")
        }
    } catch (error) {
        const message = handlePrismaError(error)
        response.status(500).send(message)
    }
})

export default router
