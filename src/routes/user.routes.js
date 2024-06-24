import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'

const router = Router()

router.get('/user', UserController.getAll)
router.post('/user', UserController.create)
router.get('/user/:id', UserController.getOne)
router.put('/user/:id', UserController.updateOne)
router.delete('/user/:id', UserController.deleteOne)

export default router
