var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const Order = require('../src/db/Models/OrderedProductSchema')
const Cart = require('../src/db/Models/CartSchema')
const Product = require('../src/db/Models/ProductSchema')



router.post('/addorder',async(req,res)=>{

const {
  proId,
  userId,
  cartId,
  quantity,
  COD,
  total,
  size,
  sellerId,
  name,
} = req.body

console.log(COD)
const isCOD = COD.toString() === 'COD';  //sb-j5rmb27609535@business.example.com )/Y8rJ@l   
console.log(isCOD)

try{
 

  const order =await new Order({
    productId:proId
    ,
    buyerId:userId
    ,
    sellerId:sellerId,
  
    name:name
    ,
    size:size,

    COD:isCOD,

    Totalprice:total,
  })
  await order.save()

   const DeleteCart = await Cart.findOneAndRemove({_id:cartId})
  const update = {};
  update[`Kidsize.Kidsizes.${size}`] = -quantity;
  const UpdateProduct = await Product.findOneAndUpdate({_id:proId},
       {$inc:{
        quantity:-quantity,
        [`Kidsize.Kidsizes.${size}`]: -quantity,
        [`size.sizes.${size}`]: -quantity

      }},
      
       { new: true }
       )


}catch(e){
  console.log(e)
}



})








module.exports = router;