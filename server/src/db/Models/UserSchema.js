const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
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
  ImageUrl: {
    type: String,
    default:''
  },
  cart:{
    type:Array
  },  
  Wishlist:{ 
    type:Array
  }, 
  Orderedlist:{ 
    type:Array
  }, 
  isSeller:{
    type:Boolean,
    default:false,
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User',UserSchema)