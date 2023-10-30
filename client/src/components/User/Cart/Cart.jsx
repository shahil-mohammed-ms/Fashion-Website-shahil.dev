import React, { useState, useEffect ,useMemo } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from '../../../axios'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import Breadcrumb from './Breadcrumb';
import Slider from '@mui/material/Slider';
import jwt_decode from 'jwt-decode';
import './Cart.css'
import './Cart-Mobile.css'

function Cart() {
  const [search,setSearch] = useState('')
  // const [count, setCount] = useState(null);
  const [userId,setUserId] = useState(null)
  const [products,setProducts]=useState([])
  // const [productQuantities, setProductQuantities] = useState(products.map(() => 0));
//  const [productQuantities, setProductQuantities] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
const [couponPressed,setCouponPressed] = useState(false)
const [couponApplied,setCouponApplied] = useState(false)
const [couponCode,setCouponCode] = useState( null)
const [productQuantities, setProductQuantities] = useState(products.map(() => 1));
const [isFrozenAndBlurred, setFrozenAndBlurred] = useState(false);
 const [proIndex,setProIndex] = useState(0)
 const [couponDiscount,setCouponDiscount] = useState(0)

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
  // applying coupon 

    const openApplyCouponBox = async (proIdNo)=>{
      console.log(proIdNo)
      
      setCouponPressed(!couponPressed)
      setFrozenAndBlurred(!isFrozenAndBlurred);
      setProIndex(proIdNo)
      console.log('openapplyclicked')


    }
  
    const closeApplyCouponBox = async ()=>{
      setCouponPressed(!couponPressed)
      setFrozenAndBlurred(!isFrozenAndBlurred);




    }
  

    const handleApplyCoupon = async (proId)=>{


      setCouponPressed(!couponPressed)
      setFrozenAndBlurred(!isFrozenAndBlurred);

      const response = await axios.post('/Cart/checkCoupon',{couponCode,proId,couponIds:products[proIndex].productData.coupon.coupons})

console.log(response.data)
if(response.data.result){
  setCouponDiscount(response.data.couponPercentage)
  setCouponApplied(true)
}else{
console.log('some thing wrong with coupon code')
setCouponDiscount(0)
setCouponApplied(false)
}


    }


  return (
    <div className='cartmain' >

<div className="header">
<div className="brandlogo"><h2 onClick={()=>navigate('/UserHome')}>fasion-store</h2></div>

<div className="searchbar" onClick={()=>navigate('/Search')} >
    <input type="text" className="search-input" placeholder="Search..."   />
    <Fab variant="extended" className="smallFab searchbutton">
<SearchIcon  />
</Fab>
  </div>


<div className="headIcons"> 

<div className="headIcons-icon">
<Fab variant="extended" className="smallFab-mobile mob1">
h
</Fab>
</div>

<div className="headIcons-icon">
<Fab variant="extended"className="smallFab">

</Fab>
</div>
<div className="headIcons-icon">
<Fab variant="extended"className="smallFab">

</Fab>
</div>
<div className="headIcons-icon">
<Fab variant="extended"className="smallFab">

</Fab></div>
</div>
 
<div className="profileDetails"> <Box>
            {/* <Fab variant='extended'className="smallFab">

            </Fab> */}
            <Fab variant='extended'className="smallFab-mobile">
p
            </Fab>
          </Box>
         <div className="user-name"><p>Shahil</p></div>
         </div>

    </div>
      {products.map((product,index)=>(

<div  className={`selectedProduct-main ${isFrozenAndBlurred ? 'blur' : ''}`} key={product._id}>


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
<div className="Realdiscount">

<div className="discountpercent">
  <span className="discpercent">
    <h3 className='dpercenttag' >{product.productData.discound?.discoundPercentage}% off</h3>
  </span>
</div>
<div className="realprice">
  <span className="price">
  <h3 className='mainptag' >{product.productData.price}</h3>
  </span>
</div>
<div className="discountprice">
  <span className="discprice">
    <h3 className='dptag' >&#8377;{product.productData.price * (1 - product.productData.discound?.discoundPercentage / 100)}</h3>
  </span>
</div>
</div>

{product.productData.coupon?.isCoupon && <div className="couponline">
<span className="couponprice">
  <p className='coupontag' > apply coupon upto &nbsp; <p className="cpercent">10% </p>&nbsp; off &nbsp;
  <span className='applycouponbtnspan' onClick={()=>{openApplyCouponBox(index)} }><p className='applycouponbtn' > &nbsp;apply coupon</p></span>  </p>
</span>
</div>}
{product.productData.coupon?.isCoupon && <div style={{display:'flex',}} ><p>Coupon discount </p> {couponApplied && <div style={{display:'flex',}} >
   <p>&nbsp;of </p> <p className='dpercenttag' >&nbsp; {couponDiscount}%  </p>

</div>} </div> }

{/* <h3>Total: {product.productData.price * (1 - product.productData.discound?.discoundPercentage / 100) *(1 - couponDiscount / 100) * productQuantities[index]}</h3> */}
<h3>Total: {Math.round(product.productData.price * (1 - (product.productData.discound?.discoundPercentage || 0) / 100) * (1 - couponDiscount / 100) * productQuantities[index])}</h3>


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
        Buy
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
  
  {couponPressed && <div className="couponcartbox">
<div className="closebtncart"><span className="closebtnspancart" onClick={closeApplyCouponBox} ><CloseIcon /></span> </div>
<span className="couponnamespan"><p>Coupon</p> </span>
<div className="couponInput">
<form action="" onSubmit={()=>handleApplyCoupon(products[proIndex].productData._id)}>

<input type="text" className="couponInputForm"
placeholder='type code...'
name="code"
 value={couponCode}
            id="code"
            onChange={(e) => {
              setCouponCode(e.target.value);}}
/>
<span className='couponspanbtn' ><button type='submit'><span >Apply coupon</span></button></span>

</form>

</div>

  </div>}
    
    </div>
  
  )
}

export default Cart