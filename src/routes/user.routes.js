import { Router } from 'express'
import multer from 'multer'
import { UserController } from '../controllers/user.controller.js'
import { getMulterStorageConfig } from '../utils/getMulterStorageConfig.js'
import { validateToken } from '../middlewares/validateToken.js'

const storageConfig = await getMulterStorageConfig()
const upload = multer({ storage: storageConfig })
const router = Router()

router.get('/user', validateToken, UserController.getAll)
router.post('/user', validateToken, upload.single('profilePic'), UserController.create)
router.get('/user/:id', validateToken, UserController.getOne)
router.put('/user/:id', validateToken, upload.single('profilePic'), UserController.updateOne)
router.delete('/user/:id', validateToken, UserController.deleteOne)

export default router
