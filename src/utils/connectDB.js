import mongoose from 'mongoose'
import process from 'process'
import { config as envConfig } from 'dotenv'
import config from 'config'

envConfig()

export const connectDB = async () => {
  try {
    await mongoose.connect(config.get('db.uri'), {
      dbName: config.get('db.name')
    })
    console.log('MongoDB connection SUCCESS')
  } catch (error) {
    console.error('MongoDB connection FAIL')
    process.exit(1)
  }
}
