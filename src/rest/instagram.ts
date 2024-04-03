import express, { Express, Request, Response } from "express"
import playwright from "playwright"

const router = express.Router()

router.get("/scrape", async (request: Request, response: Response) => {
    const url = `https://instagram.com/casaludica`
    console.log("stating browser to get instagram posts")
    const browser = await playwright["chromium"].launch()
    try {
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto(url)
        await page.waitForSelector("._aagv > img", {
            state: "visible",
        })
        await page.screenshot({ path: `profile.png` })
        const data = await page.evaluate(() => {
            const images = document.querySelectorAll("._aagv > img")
            const urls = Array.from(images).map((v) => (v as HTMLImageElement).src)
            return urls
        })
        console.log(data)
        console.log(data.length)
        response.json(data)
    } catch (error) {
        console.log(error)
    } finally {
        await browser.close()
    }
})

export default router
