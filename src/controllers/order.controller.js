/* eslint-disable camelcase */
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'

export class OrderController {

  static async create (req, res) {
    const now = new Date()
    const timeoutPromise = (ms, promise) => {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`Timeout after ${ms} ms`))
        }, ms)

        promise.then(resolve, reject).finally(() => clearTimeout(timer))
      })
    }

    const {
      id_customer,
      id_order,
      payment_method,
      amount_received,
      products: requestedProducts,
      creation_date = now.toISOString().split('T')[0],
      update_date = now.toISOString().split('T')[0]
    } = req.body

    try {
      let customer_name = ""
      const userData = await User.findById(id_customer)

      if(!userData){
        throw new Error(`Usuario con id ${id_customer} no encontrado`)
      }

      customer_name = userData.name



      let total = 0
      const products = await Promise.all(requestedProducts.map(async (prod) => {
        const productDetails = await timeoutPromise(5000, Product.findById(prod.id_product))

        if (!productDetails) {
          throw new Error(`Producto con id ${prod.id_product} no encontrado`)
        }

        const subtotal = productDetails.price * prod.quantity
        total += subtotal

        productDetails.stock = productDetails.stock - prod.quantity
        await productDetails.save()

        return {
          product: {
            id_product: productDetails._id,
            name: productDetails.name,
            price: productDetails.price,
            quantity: prod.quantity
          },
        }
      }))

      let need_change_from_payment = false
      let change_amount = 0

      if(payment_method === "efectivo") {
        if (amount_received < total) {
          return res.status(400).json({ error: 'El monto recibido es menor que el total.' })
        }else if(amount_received > total){
          if(!need_change_from_payment){
            need_change_from_payment = true
            change_amount = amount_received - total
          }
        }
      }

      const newOrder = new Order({
        id_customer,
        customer_name,
        id_order,
        payment_method,
        need_change_from_payment,
        change_amount,
        amount_received,
        total,
        products,
        creation_date,
        creation_time: now.toTimeString().split(' ')[0],
        update_date,
        update_time: now.toTimeString().split(' ')[0]
      })

      await newOrder.save()
      return res.status(201).json(newOrder)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  static async updatedStatus (req, res) {
    const { _id } = req.params
    try {
      const order = await Order.findById(_id)
      if (!order) {
        throw new Error(`La orden con ID: ${_id} no existe`)
      }
      order.is_Cancelled = true

      const orderArray = order.products.map((prod) => ({
        id_product: prod.product.id_product,
        quantity: prod.product.quantity
      }))

      const updates = orderArray.map((item) => {
        return Product.findByIdAndUpdate(
          item.id_product,
          { $inc: { stock: item.quantity } }
        )
      })

      await Promise.all(updates)

      await order.save()
      return res.status(201).json(order)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
