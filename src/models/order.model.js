import mongoose from 'mongoose'
import Product from './product.model'

const OrderSchema = new mongoose.Schema({
  id_customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    minLength: 3,
    trim: true
  },
  customer_name: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  order_id: {
    type: String,
    required: true,
    minLength: 3,
    trim: true
  },
  order_status: {
    type: Boolean,
    required: true,
    default: true
  },
  products: {
    type: [Product],
    required: true
  },
  creation_date: {
    type: Date,
    required: true
  },
  creation_time: {
    type: String,
    required: true
  },
  update_date: {
    type: Date,
    required: true
  },
  update_time: {
    type: String,
    required: true
  }
})

const Order = mongoose.model('Order', OrderSchema)
export default Order
