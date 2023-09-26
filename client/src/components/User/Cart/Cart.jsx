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
  const [count, setCount] = useState(0);

  const increment = async () => {


    // if ( count < product.Kidsize.Kidsizes[productSizename] || count < product.size.sizes[productSizename]) {
  
   
    //   setCount(count + 1);
      
     
    // }else if( ! product.Kidsize.isSize && !product.size.isSize){
    //   // 
    //   if(count < product.quantity){
    //   setCount(count +1)}
  
    // }
  
  };
  
  
    const decrement = () => {
      // if (count > 0) {
      //   setCount(count - 1);
      // }
    };


  return (
    <div>
  <div className="selectedProduct-main">


<div className="imgAndContent">
<div style={{paddingTop:'20px'}}>
<div className="p-image"></div>
</div>


<div className="p-content">
  <div className="p-content-left">
  <div className="p-content-header">
    <h1>Your's product</h1>
   
  </div>
<div className="p-contnt-price">
<p>Rs: </p>
<p>Discount</p>
<p>Coupon discount</p>
<h3>Total: </h3>

</div>
<div className="p-quantity">
<Box sx={{ '& > :not(style)': { m: 1 } }}>
<Fab size="small" color="secondary" aria-label="add" onClick={decrement}>
<RemoveIcon />
      </Fab>
      <Fab size="medium" color="secondary" aria-label="add">
      <h2>{count}</h2> 
      </Fab>
      <Fab size="small" color="secondary" aria-label="add" onClick={increment}>
      <AddIcon />
      </Fab>
</Box>
</div>

<div className="p-addtocartWishlist">



  <div className="p-addtocart"><Box sx={{ '& > :not(style)': { m: 1 } }}>

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
  
    
    </div>
  
  )
}

export default Cart