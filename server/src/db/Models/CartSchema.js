const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({

productId:{
  type:mongoose.Schema.Types.ObjectId
},
buyerId:{
  type:mongoose.Schema.Types.ObjectId
},
quantity:{
  type:Number,
  
},
createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Cart',CartSchema)