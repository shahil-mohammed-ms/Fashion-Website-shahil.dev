const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
sellerId : {
  // type:mongoose.Schema.Types.ObjectId
  type:String
},
name:{
  type:String
},
price:{
  type:Number
},
imageUrl: 
  [{
    type: String, required: true 
  }]
,
quantity:{
  type:Number
},
category:{
  type:String
},
description:{
  type:String,
  required:true
},  
discound:{
  isDiscound:{
    type:Boolean,
    default:false
  },
  discoundPercentage:{
    type:Number,
    default:0
  }
},
coupon:{
  isCoupon:{
    type:Boolean,
    default:false
  },
  coupons:{
    type:Array
  }
},
size:{
  isSize:{
    type:Boolean,
    default:false
  },
    sizes: {
      s: { type: Number, default: 0 },
      m: { type: Number, default: 0 },
      l: { type: Number, default: 0 },
      xl: { type: Number, default: 0 },
      xxl: { type: Number, default: 0 },
    },
},
Kidsize:{
  isSize:{
    type:Boolean,
    default:false
  },
  Kidsizes:{
    zeroToOne:{type:Number,default:0 },
    oneToTwo:{type:Number,default:0},
    twoToThree:{type:Number,default:0},
    threeToFour:{type:Number,default:0},
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
  type:Number,
  default:0
},
isStockOut:{
  type:Boolean,
  default:false
},
soldUnit:{
  type:Number,
  default:0
},
createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Products',ProductSchema)