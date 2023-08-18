const mongoose = require('mongoose')

const orderedProductSchema = mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId
  },
  buyerId:{
    type:mongoose.Schema.Types.ObjectId
  },
  sellerId:{
    type:mongoose.Schema.Types.ObjectId
  },
  address:{
    type:String
  },
  COD:{
    type:Boolean,
    default:false
  },
  price:{
    type:Number
  },
  quantity:{
    type:Number,
  },
  delevered:{
    type:Boolean,
    default:false
  },
  DeleveryDate:{
    type:String
  }
  ,
  OrderedDate: { type: Date, default: Date.now }
})

module.exports= mongoose.model('OrderedProduct',orderedProductSchema)