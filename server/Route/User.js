var express = require("express");
var router = express.Router();
const ProductData = require('../src/db/Models/ProductSchema')


//get products router

router.get('/getProducts/:category',async(req,res)=>{

console.log(req.params.category)
try{

  const Data =await ProductData.find({category:req.params.category}).exec();
  console.log(Data)
  res.json(Data)
}catch(e){
  console.log(e)
}

  

})
















module.exports = router;