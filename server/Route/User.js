var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
const ProductData = require('../src/db/Models/ProductSchema')
const Cart = require('../src/db/Models/CartSchema')
const User = require('../src/db/Models/UserSchema')


//get products router

router.get('/getProducts/:category/:page',async(req,res)=>{


try{
 
  const page = parseInt(req.params.page, 10);

  const limit = 3; // Number of products per page
  const skip = (page - 1) * limit;
  console.log(skip)

  const Data =await ProductData.find({category:req.params.category}).skip(skip).limit(limit).exec();
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

router.get('/search/:squery/:page',async(req,res)=>{

  const {squery} = req.params
  console.log(req.params)
try {

  const page = parseInt(req.params.page, 10); 

  const limit = 1; // Number of products per page
  const skip = (page - 1) * limit;
  console.log(skip)
  
  Data = await ProductData.find({ $text: { $search: squery } }).skip(skip).limit(limit).exec();
  console.log(Data)
  res.json(Data)
} catch (error) {
  
}
})


//             Creating user Wishlist


router.post('/addtoWishlist',async(req,res)=>{
  const {proId,userId} = req.body
try {
 
  const user = await User.findById(userId);

  user.Wishlist.push(proId);

    // Save the updated user document
    await user.save();
} catch (error) {
  
}


})

router.post('/removefromWishlist',async(req,res)=>{

  const {proId,userId} = req.body
  try {
    const user = await User.findById(userId);
    console.log(proId)
    console.log(user.Wishlist)
    user.Wishlist =await user.Wishlist.filter((productId) => productId !== proId); 
console.log(user.Wishlist)
    await user.save();
    
  } catch (error) {
    
  }

  
})
//get userDetails

router.post('/getUserDetails',async(req,res)=>{
const{userId} = req.body

try {
  const user = await User.findById(userId);

  res.json(user)


} catch (error) {
  
}

})



module.exports = router;