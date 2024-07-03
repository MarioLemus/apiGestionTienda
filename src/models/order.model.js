import mongoose from 'mongoose'

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
  payment_method: {
    type: String,
    enum: ['efectivo', 'tarjeta'],
    required: true,
    minLength: 3,
    trim: true,
    default: 'tarjeta'
  },
  need_change_from_payment: {
    type: Boolean,
    required: true,
    default: false
  },
  change_amount: {
    type: Number,
    required: true,
    default: 0
  },
  amount_received: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  order_status: {
    type: Boolean,
    required: true,
    default: true
  },
  products: [
    {
      product: {
        id_product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          minLength: 3,
          trim: true
        },
        name: {
          type: String,
          required: true,
          minLength: 3,
          trim: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    }
  ],
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
  },
  is_Cancelled: {
    type: Boolean,
    required: true,
    default: false
  }
})

const Order = mongoose.model('Order', OrderSchema)
export default Order
