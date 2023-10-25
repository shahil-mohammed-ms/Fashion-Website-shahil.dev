var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const ProductData = require('../src/db/Models/ProductSchema')
const Cart = require('../src/db/Models/CartSchema')


//get products router

router.get('/getProducts/:category',async(req,res)=>{


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

  try{
  
    const Data =await ProductData.find({_id:objectId}).exec();
    console.log(Data)
    res.json(Data)
  }catch(e){
    console.log(e)
  }
  
    
  
  })

//   router.get('/getSortData/:category/:sortType',async(req,res)=>{ 

//    const sortType = req.params.sortType     
// console.log('received')
//     console.log(req.params)
//     let Data
// try {
  
//    Data =await ProductData.find({category:req.params.category}).exec();
// if(sortType === 'lowToHigh'){
//   Data.sort((a, b) => sortOrder * (a.price - b.price));
//   res.json(Data)
// }else{
//   Data.sort((a, b) => sortOrder * (b.price - a.price));
//   res.json(Data)
// }


// } catch (error) {
//   console.log(error)
// }

//   })

router.get('/getSortData/:category/:sortType', async (req, res) => {
  const sortType = req.params.sortType;
  console.log('received');
  console.log(req.params);
  let Data;
  
  try {
    Data = await ProductData.find({ category: req.params.category }).exec();
    
    let sortOrder; // Define the sortOrder variable

    if (sortType === 'lowToHigh') {
      sortOrder = 1; // Ascending order
    } else {
      sortOrder = -1; // Descending order
    }

    Data.sort((a, b) => sortOrder * (a.price - b.price));
    console.log(Data)
    res.json(Data);

  } catch (error) {
    console.log(error);
  }
});

// category search

router.get('/searchonCategory/:category/:squery',async(req,res)=>{

  const {category,squery} = req.params
  const searchFilter = { $text: { $search: squery } };
  if (category) {
    searchFilter.category = category;
  }

try {
  
  Data = await ProductData.find(searchFilter).exec();
  console.log(Data)
res.json(Data)
} catch (error) {
  
}
})

// home search                

router.get('/search/:squery',async(req,res)=>{

  const {squery} = req.params
  console.log(req.params)
try {
  
  Data = await ProductData.find({ $text: { $search: squery } }).exec();
  console.log(Data)
  res.json(Data)
} catch (error) {
  
}
})



module.exports = router;