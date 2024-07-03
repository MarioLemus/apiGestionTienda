import { getRootDir } from './getRootDir.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

export const getMulterStorageConfig = async () => {
  try {
    const root = await getRootDir()
    const uploadDir = path.join(root, 'uploads/')
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
        cb(null, uploadDir)
      },
      filename: (req, file, cb) => {
        cb(
          null,
          `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        )
      }
    })
  } catch (error) {
    console.error('Error finding project root:', error)
  }
}
