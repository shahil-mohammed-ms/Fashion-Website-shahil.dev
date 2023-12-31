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
  name:{
    type:String
  },
  address:{
    house:{
      type:String
    },
    place:{
      type:String
    },
    houseno:{
      type:String
    },
    pincode:{
      type:Number
    },
    phone:{
      type:Number
    },
  },
  size:{
    type:String
  },
  COD:{
    type:Boolean,
    default:true
  },
  Totalprice:{
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