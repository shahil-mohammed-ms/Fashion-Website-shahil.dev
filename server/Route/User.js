var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const ProductData = require('../src/db/Models/ProductSchema')


//get products router

router.get('/getProducts/:category',async(req,res)=>{

console.log(req.params.category)
try{

  const Data =await ProductData.find({category:req.params.category}).exec();
  // console.log(Data)
  res.json(Data)
}catch(e){
  console.log(e)
}

  

})

// selected product

router.get('/selectedProduct/:id',async(req,res)=>{

  const objectId =new mongoose.Types.ObjectId(req.params.id);

  console.log(req.params.id)

  try{
  
    const Data =await ProductData.find({_id:objectId}).exec();
    console.log(Data)
    res.json(Data)
  }catch(e){
    console.log(e)
  }
  
    
  
  })














module.exports = router;