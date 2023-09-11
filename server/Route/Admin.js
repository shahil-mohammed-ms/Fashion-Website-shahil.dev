var express = require("express");
var router = express.Router();

const sellerProduct = require('../src/db/Models/ProductSchema')



router.post('/',async(req,res)=>{ 

console.log(req.body)
try{
if(req.body.size==true){
const Product = new sellerProduct({
  sellerId:"3",
  name:req.body.name,
  price:req.body.price, 
  quantity:req.body.quantity,
  category:req.body.category,
  description:req.body.description,
  size:{
    isSize:true,
    sizes:req.body.sizes
  }
  

})
await Product.save()
console.log('size')
  res.json(req.body)


}else{

  const Product = new sellerProduct({
    sellerId:"123",
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity,
    category:req.body.category,
    description:req.body.description,
  })
  await Product.save()
console.log('normal') 
  res.json(req.body)
}


 
}catch(e){
  console.log(e)
  res.status(401).json(e)
}



})















module.exports = router;