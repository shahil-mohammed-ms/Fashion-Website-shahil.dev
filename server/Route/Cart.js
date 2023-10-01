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
const id =new mongoose.Types.ObjectId (req.params.id)


const cart =await Cart.find({buyerId:id})

const cartProductIds = cart.map(item =>new mongoose.Types.ObjectId(item.productId));

const products = await Product.find({ _id: { $in: cartProductIds } });

const productsWithQuantity = cart.map(cartItem => {

  const product = products.find(product => product._id.equals(cartItem.productId));
 
  return {
    productData: product,
    name: product.name, // Replace with the actual product property you need
    // Add other product properties you need
    quantity: cartItem.quantity,
    totalPrice: cartItem.totalPrice,
    sizeType:cartItem.sizeType,
    cartId:cartItem._id
  };
});

// Now, productsWithQuantity contains an array of products with quantity and total price


res.json(productsWithQuantity)

}catch(e){
  console.log(e)
}

})

// inc dec in cart products
router.get('/cartUpdate/:count/:no/:id/:sizeType/:category/:proId/:cartId',async(req,res)=>{

  const changeVal = parseInt(req.params.no, 10); 
  console.log(changeVal)
  const count = parseInt(req.params.count, 10);
  console.log(count)
  const id = new mongoose.Types.ObjectId(req.params.id)
  const proId = new mongoose.Types.ObjectId(req.params.proId) 
  const sizeType = req.params.sizeType
  const cartId = req.params.cartId
  // console.log(sizeType)

try{
  const product = await Product.find({_id:proId}).exec()
   
  // console.log(product[0].size.sizes[sizeType])
  // console.log(product[0].size.sizes)
  // console.log(product[0].Kidsize)

  if(product[0].size.isSize || product[0].Kidsize.isSize){

    //for men women
    if(product[0].size.isSize){

      if(product[0].size.sizes[sizeType]>=count){
        const cond = product[0].size.sizes[sizeType]>=count
        console.log(product[0].size.sizes[sizeType])

        console.log('menwemen')

        const cart =await Cart.findOneAndUpdate({_id:cartId},
          { $inc: { quantity: changeVal } },
          { new: true }).exec() // To return the updated document)
          console.log(cart)

        res.json({reply:true})
      }else{
        res.json({reply:false})
      }


    }else{
// for kids
if(product[0].Kidsize.Kidsizes[sizeType]>=count){
  
  console.log('kid')
  const cart =await Cart.findOneAndUpdate({_id:cartId},
    { $inc: { quantity: changeVal } },
    { new: true }).exec() // To return the updated document)


  res.json({reply:true})
}else{
  res.json({reply:false})
}


    }



  }else{
    if(product[0].quantity>=count){
      
      const cart =await Cart.findOneAndUpdate({_id:cartId},
        { $inc: { quantity: changeVal } },
        { new: true }).exec() // To return the updated document)

    
      res.json({reply:true})
    }else{
      res.json({reply:false})
    }
    console.log('normal')
  }


}catch(e){
  console.log(e)
}





})



module.exports = router;