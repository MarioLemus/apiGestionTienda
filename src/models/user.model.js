import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    trim: true
  },
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
    lowercase: true,
    trim: true
  },
  phone_number: {
    type: Number,
    default: null
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  profilePic: {
    type: String,
    trim: true,
    default: ''
  },
  adresses: {
    type: [
      {
        alias: {
          type: String,
          minLength: 3,
          required: true,
          trim: true
        },
        address: {
          type: String,
          minLength: 3,
          required: true,
          trim: true
        },
        reference_point: {
          type: String,
          required: true,
          minLength: 3,
          trim: true
        }
      }
    ],
    default: [],
    required: false
  },
  role: {
    type: String,
    enum: ['user', 'employee', 'admin', 'superadmin'],
    trim: true,
    lowercase: true,
    default: 'user'
  }
})

const User = mongoose.model('User', UserSchema)
export default User
