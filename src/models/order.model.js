import mongoose from 'mongoose'
import Product from './product.model.js'

const OrderSchema = new mongoose.Schema({
  id_customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    minLength: 3,
    trim: true
  },
  customer_name: {
    type: String,
    required: false,
    minLength: 3,
    trim: true
  },
  id_order: {
    type: String,
    required: false,
    minLength: 3,
    trim: true
  },
  order_status: {
    type: Boolean,
    required: true,
    default: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
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
