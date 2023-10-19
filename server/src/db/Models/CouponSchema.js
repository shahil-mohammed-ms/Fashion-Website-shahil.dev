const mongoose = require('mongoose')

const CouponSchema = mongoose.Schema({
  code:{
    type:String,
    require:true
   }, 
  name:{
   type:String,
   require:true
  }, 
  discount:{
   type:Number,
   require:true
  },
  description:{
    type:String,
    require:true
  },
expiryDate:{
  type:Date,
  require:true
},
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Coupon',CouponSchema)