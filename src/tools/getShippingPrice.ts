import { Order } from "../class/Order"
import { OrderProduct } from "../class/OrderProduct"

export const getShippingPrice = (order: Order, products: OrderProduct[]) =>
    order.total - products.reduce((sum, product) => (sum += product.price * product.quantity), 0)
