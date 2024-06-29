import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

const router = Router()
const productController = new ProductController()

router.post('/create-product', productController.create)
router.put('/edit-product/:_id', productController.edit)
router.delete('/delete-product/:_id', productController.delete)
router.get('/get-product', productController.get)
router.get('/getbyname/:name', productController.getbyname)

export default router
