import express, { Express, Request, Response } from 'express'
import login from './src/login'
import products from './src/products'

export const router = express.Router()

router.use('/products', products)