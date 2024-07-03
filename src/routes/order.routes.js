import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'
import { validateToken } from "../middlewares/validateToken.js";

const router = Router()

router.post('/order',validateToken, OrderController.create)
router.put('/order/cancel/:_id',validateToken, OrderController.cancelOrder)
router.put('/order/updateOrderStatus/:_id',validateToken, OrderController.updateOrderStatus)

export default router