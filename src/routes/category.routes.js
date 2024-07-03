import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.js'

const router = Router()
const categoryController = new CategoryController()

router.post('/category', categoryController.post)
router.put('/category/:_id', categoryController.put)
router.delete('/category/:_id', categoryController.delete)
router.get('/category', categoryController.get)
router.get('/category/:name', categoryController.getbyname)

export default router
