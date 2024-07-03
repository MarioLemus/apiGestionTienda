import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { config as envConfig } from 'dotenv'
import config from 'config'
import { connectDB } from './utils/connectDB.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import categoryRoutes from './routes/category.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

envConfig()
connectDB()
const app = express()
const port = config.get('server.port')
const devClient = 'http://localhost:5173'

app.use(cookieParser())
app.use(express.json())
app.use(logger(config.get('logger')))
app.use(
  cors({
    origin: [devClient],
    credentials: true
  })
)

app.use('/api/v1/', authRoutes)
app.use('/api/v1/', userRoutes)
app.use('/api/v1/', orderRoutes)
app.use('/api/v1/', productRoutes)
app.use('/api/v1/', categoryRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
