var express = require("express");
const multer = require("multer");
var router = express.Router();

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



router.post('/',upload.array('image', 5),async(req,res)=>{ 


try{
  const imageUrls = req.files.map((file) => {
    return  file.filename; // Assuming the files are stored in the 'uploads' folder
  });
if(req.body.size){

  const sizes =await JSON.parse(req.body.sizes);
  console.log(req.body.sizes)
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
console.log('size')
console.log(Product.size.sizes)
  res.json(req.body)


}else if(req.body.Kidsize){
  console.log(req.body.Kidsizes)
 
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
  console.log('kiddss')
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
console.log('normal') 
  res.json(req.body) 

}


 
}catch(e){
  console.log(e)
  res.status(401).json(e)
}



})















module.exports = router;