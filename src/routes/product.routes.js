import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { validateToken } from '../middlewares/validateToken.js'
import multer from 'multer'
import { getMulterStorageConfig } from '../utils/getMulterStorageConfig.js'

const router = Router()
const productController = new ProductController()
const storage = await getMulterStorageConfig()
const upload = multer({ storage })

router.post('/product', validateToken, productController.create)
router.put('/product/:_id', validateToken, upload.single('image'), productController.edit)
router.delete('/product/:_id', validateToken, productController.delete)
router.get('/product', productController.get)
router.get('/product/:name', productController.getbyname)
router.get('/product/category/:category_id', productController.getbycategory)

export default router
