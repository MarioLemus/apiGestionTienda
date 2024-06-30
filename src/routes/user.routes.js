import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { getMulterStorageConfig }from '../utils/getMulterStorageConfig.js'
import multer from 'multer'

const storageConfig = await getMulterStorageConfig();
const upload = multer({ storage: storageConfig });
const router = Router()

router.get('/user', UserController.getAll)
router.post('/user', upload.single('profilePic'), UserController.create)
router.get('/user/:id', UserController.getOne)
router.put('/user/:id', upload.single('profilePic'), UserController.updateOne)
router.delete('/user/:id', UserController.deleteOne)

export default router
