import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.js'

const router = Router()
const categoryController = new CategoryController()

router.post('/create-category', categoryController.post)

router.put('/edit-category/:_id', categoryController.put)

router.delete('/delete-category/:_id', categoryController.delete)

router.get('/get-category', categoryController.get)

export default router
