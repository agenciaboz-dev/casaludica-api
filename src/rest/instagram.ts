import express, { Express, Request, Response } from "express"
import playwright from "playwright"
import instagram from "../api/instagram"
import axios, { AxiosResponse } from "axios"

const router = express.Router()

// router.get("/scrape", async (request: Request, response: Response) => {
//     const url = `https://instagram.com/casaludica`
//     console.log("stating browser to get instagram posts")
//     const browser = await playwright["chromium"].launch({ headless: true })
//     try {
//         console.log("opening page")
//         const context = await browser.newContext({
//             userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
//         })
//         const page = await context.newPage()
//         await page.goto(url)
//         console.log("waiting for images")
//         await new Promise((resolve) => setTimeout(resolve, 5000))
//         // await page.waitForSelector("._aagv > img", {
//         //     state: "visible",
//         // })
//         await page.screenshot({ path: `static/debug-before-waitForSelector.png` })
//         console.log("evaluating images")
//         // await page.screenshot({ path: `profile.png` })
//         const data = await page.evaluate(() => {
//             const images = document.querySelectorAll("._aagv > img")
//             const urls = Array.from(images).map((v) => (v as HTMLImageElement).src)
//             return urls
//         })
//         console.log(data)
//         console.log(data.length)
//         response.json(data)
//     } catch (error) {
//         console.log(error)
//     } finally {
//         await browser.close()
//     }
// })

router.get("/scrape", async (request: Request, response: Response) => {
    let posts = instagram.getPosts()
    console.log(posts)
    response.json(posts)
})

router.post("/image", async (request: Request, response: Response) => {
    const data = request.body
    const url = data.url
    // console.log(url)
    try {
        const image_response = await axios.get(url, {
            responseType: "arraybuffer",
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        })

        const base64Image = Buffer.from(image_response.data, "binary").toString("base64")
        const contentType = image_response.headers["content-type"] || "application/octet-stream"

        response.send(`data:${contentType};base64,${base64Image}`)
    } catch (error) {
        console.log("error")
        console.log(url)
        // console.error("Failed to fetch the image:", error)
        // response.status(500).send("Failed to fetch the image")
    }
})

export default router
