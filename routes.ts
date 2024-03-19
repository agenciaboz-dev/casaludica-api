import express, { Express, Request, Response } from "express"
import products from "./src/rest/products"
import categories from "./src/rest/categories"
import collections from "./src/rest/collections"
import cep from "./src/rest/cep"
import order from "./src/rest/order"
import user from "./src/rest/user"
import franchise from "./src/rest/franchise"
import webhook from "./src/rest/webhook/webhook"
import newsletter from "./src/rest/newsletter"

export const router = express.Router()

router.use("/products", products)
router.use("/categories", categories)
router.use("/collections", collections)
router.use("/cep", cep)
router.use("/order", order)
router.use("/user", user)
router.use("/franchise", franchise)
router.use("/webhook", webhook)
router.use("/newsletter", newsletter)
