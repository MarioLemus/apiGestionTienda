import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router.get('/user', validateToken, UserController.getAll)
router.post('/user', validateToken, UserController.create)
router.get('/user/:id', validateToken, UserController.getOne)
router.put('/user/:id', validateToken, UserController.updateOne)
router.delete('/user/:id', validateToken, UserController.deleteOne)

export default router
