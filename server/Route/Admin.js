var express = require("express");
const multer = require("multer");
const fs = require('fs');
var router = express.Router();
const mongoose = require('mongoose');
const Seller = require('../src/db/Models/SellerSchema')
const sellerProduct = require('../src/db/Models/ProductSchema')

var Storage = multer.diskStorage({
  destination: "./public/images/product",
  filename: (req, file, cb) => {
    // Extract the original file extension
    const fileExtension = file.originalname.split(".").pop();

    // Generate a unique filename based on the current timestamp
    const uniqueFilename = `${Date.now()}.${fileExtension}`;

    // Set the filename for storing the image
    cb(null, uniqueFilename);
  },
});

var upload = multer({
  storage: Storage,
});


// add product
router.post('/',upload.array('image', 5),async(req,res)=>{ 

console.log('object')
console.log(req.files)
try{
  const imageUrls = req.files.map((file) => {
    console.log(file.filename)
    return  file.filename; // Assuming the files are stored in the 'uploads' folder
  });
if(req.body.size){

  const sizes =await JSON.parse(req.body.sizes);

const Product =await new sellerProduct({
  sellerId:req.body.sellerId,
  name:req.body.name,
  price:req.body.price,  
  imageUrl:imageUrls,
  quantity:req.body.quantity,
  category:req.body.category,
  description:req.body.description,
  size:{
    isSize:true,
    sizes:sizes
  }
  

})

await Product.save()

  res.json(req.body)


}else if(req.body.Kidsize){

 
  const  Kidsizes =await JSON.parse(req.body.Kidsizes ); 
  const Product = new sellerProduct({
    sellerId:req.body.sellerId,
    name:req.body.name,
    imageUrl:imageUrls,
    price:req.body.price, 
    quantity:req.body.quantity,
    category:req.body.category,
    description:req.body.description,
    Kidsize:{
      isSize:true,
      Kidsizes:Kidsizes
    }
    
  
  })
  await Product.save()

  res.json(req.body) 
  
}
else{

  const Product = new sellerProduct({
    sellerId:req.body.sellerId,
    name:req.body.name,
    price:req.body.price,
    imageUrl:imageUrls,
    quantity:req.body.quantity,
    category:req.body.category,
    description:req.body.description,
  })
  await Product.save()

  res.json(req.body) 

}


 
}catch(e){
  console.log(e)
  res.status(401).json(e)
}



})



router.post('/getSellerItemsList',async (req,res)=>{

const {sellerId} = req.body
const id =new mongoose.Types.ObjectId (sellerId)

try{

 const productList = await sellerProduct.find({sellerId:id})


 res.json(productList)
}catch(e){


}

})



//update product


router.put('/updateProduct',upload.array('image', 5), async (req, res) => {

  let imageUrls;

  const {
    productId,
    name,
    price,
    quantity,
    category,
    description,
    imageClone,
    sellerId,
    size,
    sizes,
    Kidsizes,
    Kidsize,
  } = req.body;
console.log(imageClone)
 
  if (req.files.length<=0) {
   
   imageUrls=imageClone
  } else {
  
    try {
      imageUrls = req.files.map((file) => {
      console.log(file.filename)
        return file.filename; // Assuming the files are stored in the 'uploads' folder
      });


      const deleteImages = async () => {
        // Split the imageClone string into an array of image filenames
        const imageFilenames = imageClone.split('\n');
      
        // Loop through the image filenames and delete each image
        imageFilenames.forEach((imageName) => {
          const path = './public/images/product/' + imageName.trim(); // Trim to remove any leading/trailing whitespace
      
          fs.unlink(path, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully: ' + imageName);
            }
          });
        });
      };
      
      await deleteImages();
      
      


    } catch (e) {
      console.log(e);
    }
  }

  try {
    // console.log('imgurls ', imageUrls)
    const Data = await sellerProduct.findOneAndUpdate(
      { _id: productId },
      {
        sellerId,
        name,
        imageUrl:imageUrls,
        price,
        quantity,
        category,
        description,
        size:{
          isSize:size,
          sizes:sizes
        },
        Kidsize:{
          isSize:Kidsize,
          Kidsizes:Kidsizes
        }
        


      },
      { new: true }
    ).exec();

  
    res.json(Data);
  } catch (e) {
    console.log(e);
  }
});


router.post('/deleteproduct',async(req,res)=>{
const {proId} = req.body
 const id =new mongoose.Types.ObjectId (proId)
try {
  const deleteProduct = await sellerProduct.findOneAndDelete(proId)
res.json({response:true})

} catch (error) {
  res.json({response:false})
}


})




module.exports = router;