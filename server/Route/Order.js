var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const Order = require('../src/db/Models/OrderedProductSchema')



router.post('/addorder',async(req,res)=>{

const {
  proId,
  userId,
  cartId,
  quantity,
  total,
  size,
  sellerId,
  name,} = req.body

try{
  console.log(req.body)

  const order =await new Order({
    productId:proId
    ,
    buyerId:userId
    ,
    // sellerId:
    // ,
    name:name
    ,
    // size:
  })
  await order.save()

}catch(e){
  console.log(e)
}



})








module.exports = router;