import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import google_drive from "./api/google_drive"
import { UploadedFile } from "express-fileupload"
import databaseHandler from "./databaseHandler"
const router = express.Router()
const prisma = new PrismaClient()

router.get("/list", async (request: Request, response: Response) => {
    const users = await databaseHandler.user.list()
    response.json(users)
})

router.post("/profile_pic/:user_id", async (request: Request, response: Response) => {
    const user_id = request.params.user_id
    const file = request.files?.file

    if (file) {
        try {
            const file_id = await google_drive.uploadUserImage(file as UploadedFile, user_id)
            response.json(file_id)
        } catch (error) {
            console.log(error)
        }
    }
})

export default router
