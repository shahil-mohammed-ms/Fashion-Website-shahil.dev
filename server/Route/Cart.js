var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../src/db/Models/CartSchema')
const Product =require('../src/db/Models/ProductSchema')




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



router.get('/getcartProducts/:id',async  (req,res)=>{

try{
const id = req.params.id

const cart =await Cart.find({buyerId:id})
const cartProductIds = cart.map(item =>new mongoose.Types.ObjectId(item.productId));
const products = await Product.find({ _id: { $in: cartProductIds } });
console.log(cartProductIds)
console.log(products)
const productsWithQuantity = cart.map(cartItem => {
  const product = products.find(product => product._id.equals(cartItem.productId));
  return {
    productData: product,
    name: product.name, // Replace with the actual product property you need
    // Add other product properties you need
    quantity: cartItem.quantity,
    totalPrice: cartItem.totalPrice,
  };
});

// Now, productsWithQuantity contains an array of products with quantity and total price
console.log(productsWithQuantity);

res.json(productsWithQuantity)

}catch(e){
  console.log(e)
}

})





module.exports = router;