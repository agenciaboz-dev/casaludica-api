import express, { Express, Request, Response } from "express"
import products from "./src/products"
import categories from "./src/categories"
import collections from "./src/collections"
import cep from "./src/cep"
import order from "./src/order"
import user from "./src/user"

export const router = express.Router()

router.use("/products", products)
router.use("/categories", categories)
router.use("/collections", collections)
router.use("/cep", cep)
router.use("/order", order)
router.use("/user", user)
