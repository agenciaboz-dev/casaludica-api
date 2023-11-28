import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import google_drive from "./api/google_drive"
import { UploadedFile } from "express-fileupload"
import databaseHandler from "./databaseHandler"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/exists", async (request: Request, response: Response) => {
    const data = request.body

    const user = await databaseHandler.user.existingUser(data.login)
    response.json(user)

    if (user && !user.password) {
        // enviar email para cadastrar a senha
    }
})

router.post("/new_password", async (request: Request, response: Response) => {
    const data = request.body

    const user = await databaseHandler.user.newPassword(Number(data.id), data.password)
    response.json(user)
})

router.get("/list", async (request: Request, response: Response) => {
    const users = await databaseHandler.user.list()
    response.json(users)
})

router.post("/upload_profile_pic/:user_id", async (request: Request, response: Response) => {
    const user_id = request.params.user_id
    const file = request.files?.file

    if (file) {
        try {
            const image_url = await google_drive.uploadUserImage(file as UploadedFile, user_id)

            if (image_url) {
                const user = await databaseHandler.user.updateProfilePicture(Number(user_id), image_url)
                response.json({ user })
            } else {
                response.json({ error: "getting image url, but it was uploaded" })
            }
        } catch (error) {
            console.log(error)
            response.json({ error })
        }
    }
})

router.post("/login", async (request: Request, response: Response) => {
    const data = request.body

    const user = await databaseHandler.user.login(data.login, data.password)
    response.json(user)
})

export default router
