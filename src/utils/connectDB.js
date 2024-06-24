import mongoose from 'mongoose'
import process from 'process'
import { config } from 'dotenv'

config()

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME
    })
    console.log('MongoDB connection SUCCESS')
  } catch (error) {
    console.error('MongoDB connection FAIL')
    process.exit(1)
  }
}
