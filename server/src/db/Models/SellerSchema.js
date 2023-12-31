const mongoose = require('mongoose')

const SellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products:{
    type:Array
  },  
  isSeller:{
    type:Boolean,
    default:true,
  },
  ImageUrl: {
    type: String,
    default:''
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Seller',SellerSchema)