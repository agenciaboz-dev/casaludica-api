import express, { Express, Request, Response } from "express"
const router = express.Router()

router.get("/authorize", async (request: Request, response: Response) => {
    const code = request.query.code
    console.log(code)

    response.send(code)
})

export default router
