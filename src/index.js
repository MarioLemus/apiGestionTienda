import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import process from 'process'
import { config } from 'dotenv'
import { connectDB } from './utils/connectDB.js'
import userRoutes from './routes/user.routes.js'

config()
connectDB()
const app = express()
const port = process.env.PORT || 3000
const devClient = 'http://localhost:5173'

app.use(express.json())
app.use(logger('dev'))
app.use(cors({
  origin: [
    devClient
  ]
}))

app.use('/api/v1/', userRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
