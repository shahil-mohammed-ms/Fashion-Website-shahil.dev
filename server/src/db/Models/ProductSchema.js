const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
sellerId : {
  type:mongoose.Schema.Types.ObjectId
},
name:{
  type:String
},
price:{
  type:Number
},
imageUrl: [
  {
    type: String, required: true 
  }
],

quantity:{
  type:Number
},
category:{
  type:String
},
brand:{
  type:string
},
discound:{
  isDiscound:{
    type:Boolean,
    default:false
  },
  discoundPercentage:{
    type:Number
  }
},
coupon:{
  isCoupon:{
    type:Boolean,
    default:false
  }
},
size:{
  isSize:{
    type:Boolean,
    default:false
  },
  sizes:{
    s:{type:Number },
    m:{type:Number},
    l:{type:Number},
    xl:{type:Number},
    xxl:{type:Number}
  }
},
colour:{
  isColor:{
    type:Boolean,
    default:false
  },
  colours:{
    type:Array
  }
},
review:[
 { id:{
   type:mongoose.Schema.Types.ObjectId
}
}
],
rating:{
  type:Number,
  default:0
},
totalReviews:{
  type:Number
},
isStockOut:{
  type:Boolean,
  default:false
},
soldUnit:{
  type:number
},
createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Products',ProductSchema)