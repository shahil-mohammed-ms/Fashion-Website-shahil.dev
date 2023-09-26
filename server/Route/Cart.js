var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../src/db/Models/CartSchema')




router.post('/addCart',async(req,res)=>{

  const {  productId, buyerId,quantity,price,sizeType,sizeTypeQuantity} = req.body
  console.log(productId, buyerId,quantity,price,sizeType,sizeTypeQuantity)
const Total=price*quantity
console.log(Total)
try{ 
  if(!sizeType){
    const cart = new Cart({
      productId,
      buyerId,
      price,
      totalPrice:Total,
      // sizeType,
      quantity,
      // sizeTypeQuantity,
    
    })
    
    await cart.save()
  }else{
    const cart = new Cart({
      productId,
      buyerId,
      price,
      totalPrice:Total,
      sizeType,
      quantity:sizeTypeQuantity,
      
    
    })
    
    await cart.save()
  }



res.json({result:'success'})

}catch(e){
  console.log(e)
}

})









module.exports = router;