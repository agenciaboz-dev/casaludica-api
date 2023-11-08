import express, { Express, Request, Response } from 'express'
import login from './src/login'
import products from './src/products'
import categories from './src/categories'
import cep from "./src/cep"
import order from "./src/order"

export const router = express.Router()

router.use("/products", products)
router.use("/categories", categories)
router.use("/cep", cep)
router.use("/order", order)