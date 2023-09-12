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

// // Set up Multer to handle file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Define the destination folder for uploaded files
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Define how the uploaded files should be named
//     const fileExtension = path.extname(file.originalname);
//     cb(null, Date.now() + fileExtension);
//   },
// });

// const upload = multer({ storage: storage });

router.post('/',upload.array('image', 5),async(req,res)=>{ 
  console.log(req.body.Kidsize)
  console.log('kiddsso') 

console.log(req.files)

try{
  const imageUrls = req.files.map((file) => {
    return  file.filename; // Assuming the files are stored in the 'uploads' folder
  });
if(req.body.size){
  const sizes = JSON.parse(req.body.sizes);
  console.log(req.body.sizes)
const Product = new sellerProduct({
  sellerId:"3",
  name:req.body.name,
  price:req.body.price, 
  imageUrl:imageUrls,
  quantity:req.body.quantity,
  category:req.body.category,
  description:req.body.description,
  size:{
    isSize:true,
    sizes
  }
  

})
await Product.save()
console.log('size')
  res.json(req.body)


}else if(req.body.Kidsize){
  console.log(req.body.Kidsizes)
  console.log('kiddsso')
  const  Kidsizes = JSON.parse(req.body.Kidsizes ); 
  const Product = new sellerProduct({
    sellerId:"1",
    name:req.body.name,
    imageUrl:imageUrls,
    price:req.body.price, 
    quantity:req.body.quantity,
    category:req.body.category,
    description:req.body.description,
    Kidsize:{
      isSize:true,
      Kidsizes
    }
    
  
  })
  await Product.save()
}
else{

  const Product = new sellerProduct({
    sellerId:"555",
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