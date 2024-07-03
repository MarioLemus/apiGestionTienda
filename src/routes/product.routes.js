import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

const router = Router()
const productController = new ProductController()

router.post('/product', productController.create)
router.put('/product/:_id', productController.edit)
router.delete('/product/:_id', productController.delete)
router.get('/product', productController.get)
router.get('/product/:name', productController.getbyname)
router.get('/product/category/:category_id', productController.getbycategory)

export default router
