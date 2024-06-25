import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { config as envConfig } from 'dotenv'
import config from 'config'
import { connectDB } from './utils/connectDB.js'
import userRoutes from './routes/user.routes.js'
//import fs from 'fs'
//import path from 'path'

envConfig()
connectDB()
const app = express()
const port = config.get('server.port')
const devClient = 'http://localhost:5173'

// eslint-disable-next-line no-undef
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//app.use(logger('combined', { stream: accessLogStream }))
app.use(express.json())
app.use(logger(config.get('logger')))
app.use(cors({
  origin: [
    devClient
  ]
}))

app.use('/api/v1/', userRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
