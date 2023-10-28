const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({

productId:{
  type:mongoose.Schema.Types.ObjectId
},
buyerId:{
  type:mongoose.Schema.Types.ObjectId
},
createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Wishlist',WishlistSchema)