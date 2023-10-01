import React, { useState, useEffect ,useMemo } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from '../../../axios'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import Breadcrumb from './Breadcrumb';
import Slider from '@mui/material/Slider';
import jwt_decode from 'jwt-decode';
import './Cart.css'

function Cart() {
  // const [count, setCount] = useState(null);
  const [userId,setUserId] = useState(null)
  const [products,setProducts]=useState([])
  // const [productQuantities, setProductQuantities] = useState(products.map(() => 0));
  const [productQuantities, setProductQuantities] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
 
// const handleBuy = ()=>{

// navigate(`/payment?userId=${userId}&cartId=${products.cartId}`)

// }


  useEffect(()=>{
const getData = async()=>{
  const token = localStorage.getItem('Usertoken');
  
  if (token) {
    // Decode the token to get user details
    const decodedToken = jwt_decode(token);
    
    setUserId(decodedToken.userId)
  
  }
if(userId){
  const response = await axios.get(`/Cart/getcartProducts/${userId}`)

  setProducts(response.data)
  // setProductQuantities(new Array(response.data.length).fill(0));
  const initialQuantities = response.data.map((product) => product.quantity);
  setProductQuantities(initialQuantities);
  console.log(response.data)
  

}
 

}
getData()

  },[userId])

  const increment = async (index,sizeType,category,proId,cartId) => {
console.log("first"+productQuantities[index])
    const updatedQuantities = [...productQuantities];
    console.log(updatedQuantities[index])
var passCount =updatedQuantities[index]
const response = await axios.get(`/Cart/cartUpdate/${passCount+1}/${1}/${userId}/${sizeType}/${category}/${proId}/${cartId}`)
console.log(response.data.reply)

if(response.data.reply){
  updatedQuantities[index]++;
  console.log(updatedQuantities[index])

  setProductQuantities(updatedQuantities);
}
   
  
  };
  
  
    const decrement =async (index,sizeType,category,proId,cartId) => {


      const updatedQuantities = [...productQuantities];
      var passCount =updatedQuantities[index]
if(passCount>+1){
  const response = await axios.get(`/Cart/cartUpdate/${passCount-1}/${-1}/${userId}/${sizeType}/${category}/${proId}/${cartId}`)

  console.log(response.data.reply)
  if(response.data.reply){

  if (updatedQuantities[index] > 0) {
    console.log(updatedQuantities[index])
    updatedQuantities[index]--;
    setProductQuantities(updatedQuantities);
  }
}
}
     
    };
  
    


  return (
    <div>
      {products.map((product,index)=>(

<div className="selectedProduct-main" key={index}>


<div className="imgAndContent">
<div style={{paddingTop:'20px'}}>
<div className="p-image" style={{
        backgroundImage: `url(http://localhost:5000/image/images/product/${product.productData.imageUrl[0]})`,
      }}></div>
</div>


<div className="p-content">
  <div className="p-content-left">
  <div className="p-content-header">
    <h1>{product.name}</h1>
   
  </div>
<div className="p-contnt-price">
<p>Rs:{product.productData.price}</p>
<p>Discount</p>
<p>Coupon discount</p>
<h3>Total: {product.productData.price*product.quantity}</h3>

</div>
<div className="p-quantity">
<Box sx={{ '& > :not(style)': { m: 1 } }}>
<Fab size="small" color="secondary" aria-label="add" onClick={() => decrement(index,product.sizeType,product.productData.category,product.productData._id,product.cartId)}>
<RemoveIcon />
      </Fab>
      <Fab size="medium" color="secondary" aria-label="add">
      {/* <h2>{!count ? product.quantity:count}</h2>  */}
      <h2>{productQuantities[index]}</h2> 
      </Fab>
      <Fab size="small" color="secondary" aria-label="add"  onClick={() =>increment(index,product.sizeType,product.productData.category,product.productData._id,product.cartId)}>
      <AddIcon />
      </Fab>
</Box>
</div>

<div className="p-addtocartWishlist">



  <div className="p-addtocart"><Box sx={{ '& > :not(style)': { m: 1 } }} onClick={()=>{
    navigate(`/payment?userId=${userId}&cartId=${product.cartId}&proId=${product.productData._id}&quantity=${product.quantity}
    &name=${product.name}&total=${product.totalPrice}&size=${product.sizeType}&sellerId=${product.productData.sellerId}`)
  }}>

<Fab variant="extended">
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Buy Item 
      </Fab>
</Box>
</div>


</div>
  </div>
  <div className="p-content-right">
{/* <h1>hkoojghigllllllllllllllllllll</h1> */}
  </div>
 


</div>


</div>
<div className="p-details">




</div>


<hr></hr>

    </div>
      ))

      }
  
  
    
    </div>
  
  )
}

export default Cart