import { NextFunction, Request, Response } from "express"
import igest from "../api/igest"

export const authentication = (request: Request, response: Response, next: NextFunction) => {
    const auth_header = request.headers.authorization
    console.log(auth_header)

    if (!auth_header || !auth_header.includes("Basic ")) {
        response.status(401).json({ error: "not authorized" })
        return
    }

    const spllited = auth_header.split("Basic ")
    if (spllited.length != 2) {
        response.status(401).json({ error: "not authorized" })
        return
    }

    const token = spllited[1]
    if (token != igest.token) {
        response.status(401).json({ error: "not authorized" })
    }

    next()
}
