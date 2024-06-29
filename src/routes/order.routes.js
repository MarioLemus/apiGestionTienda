import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'

const router = Router()

router.post('/order', OrderController.create)
router.put('/order/:_id', OrderController.updatedStatus)

export default router
