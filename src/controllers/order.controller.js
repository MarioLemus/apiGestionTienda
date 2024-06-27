import express from 'express';
import Order from "../models/order.model.js";

export class OrderController {

    static async create (req, res) {
        const { id_customer, 
          customer_name, 
          id_order,  
          products} = req.body;

        const now = new Date()

        const newOrder = new Order({id_customer, 
          customer_name, 
          id_order, 
          order_status: true, 
          products, 
          creation_date: new Date(), 
          creation_time: now.toTimeString().split(' ')[0], 
          update_date: new Date(), 
          update_time: now.toTimeString().split(' ')[0]});
        try{    
          await newOrder.save();
          res.status(201).json(newOrder);
        }catch(err){
          res.status(500).json({error: err.message});
        }
    }

    static async updateStock (req, res) {
        const prods = await Order.find(req.body.products) 
        const prodArray = [prods]
        try{
          console.log(prodArray)
          res.status(200).json({message: 'Stock actualizado'});
        }catch(err){
          res.status(500).json({error: error.message});
        }
      }
} 