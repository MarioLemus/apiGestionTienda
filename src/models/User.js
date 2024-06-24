import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'employee', 'admin', 'superadmin'],
    trim: true,
    default: 'user'
  }
})

const User = mongoose.model('User', UserSchema)
export default User
