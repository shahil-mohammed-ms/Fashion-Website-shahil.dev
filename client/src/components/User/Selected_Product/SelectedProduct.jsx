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
import Breadcrumb from './Breadcrumb';
import './SelectedProduct.css'
import Slider from '@mui/material/Slider';
import jwt_decode from 'jwt-decode';



function SelectedProduct() {
  const [marks, setMarks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
 
  const[valueToLabel,setValueToLabel] = useState({})

  //db details for cart
  const [productSizename,setProductSizeName] = useState('')
  const [product,setProduct] = useState({})
  const [category,setCategory] = useState('')
  const [userId,setUserId] = useState('')


  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  
useEffect(()=>{
  const token = localStorage.getItem('Usertoken');

  if (token) {
    // Decode the token to get user details
    const decodedToken = jwt_decode(token);
    console.log(decodedToken.userId)
    setUserId(decodedToken.userId)
  
  }
  
},[])

  useEffect(()=>{
 
 const fetchData = async ()=>{
  const queryParams = new URLSearchParams(location.search);
  const proId = queryParams.get('proId')
 // const category = queryParams.get('category');
 setCategory(queryParams.get('category'))   

if(queryParams.get('category')==='Mens' || queryParams.get('category')==='Womens' ){

  setMarks([
    { value: 0, label: 's' },
    { value: 1, label: 'm' },
    { value: 2, label: 'l' },
    { value: 3, label: 'xl' },
    { value: 4, label: 'xxl' },
  ]);
  setValueToLabel( {
    0: 's',
    1: 'm',
    2: 'l',
    3: 'xl',
    4: 'xxl',
  })
  // const valueToLabel =;
}else if(queryParams.get('category')==='Kids'){
  setMarks([
    { value: 0, label: 'zeroToOne' },
    { value: 1, label: 'oneToTwo' },
    { value: 2, label: 'twoToThree' },
    { value: 3, label: 'threeToFour' },
    
  ]);
  setValueToLabel( {
    0: 'zeroToOne',
    1: 'oneToTwo',
    2: 'twoToThree',
    3: 'threeToFour',
 
  })

}else{

  setMarks([])
}



try{
const response = await axios.get(`/User/selectedProduct/${proId}`)
setProduct(response.data[0])
 console.log(response.data[0])

}catch(e){
  console.log(e)
}

 }
 fetchData()
 
  }, [location.search])



  
const [count, setCount] = useState(0);

const increment = async () => {


  if ( count < product.Kidsize.Kidsizes[productSizename] || count < product.size.sizes[productSizename]) {

 
    setCount(count + 1);
    
   
  }else if( ! product.Kidsize.isSize && !product.size.isSize){
    // 
    if(count < product.quantity){
    setCount(count +1)}

  }

};


  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  
  
const valuetext = (value) =>{
  
  setProductSizeName(valueToLabel[value])
  
}
const handleChange = (event, newValue) => {
  // Reset count to 0 whenever the slider value changes
  setCount(0);
};

// add to cart 

 const AddCart =async () =>{

try{

const response = await axios.post('/Cart/addCart',{

  productId:product._id,
  buyerId:userId,
  quantity:count,
  price:product.price,
  sizeType:productSizename,
  sizeTypeQuantity:count,

  
})
console.log(response.data)

}catch(e){

  console.log(e)
}

 }



  return (
    <div className="selectedProduct-main">

<div className="s-product-Top">
<Breadcrumb handleClick={handleClick} type={category}/>

</div>
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

<h3>Rs: {product.price}</h3>

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
<div className="sizes">
  <div className="size-header"><h2>size</h2></div>
  <div className="sizecomponent">

 
    <Box sx={{ width: 400 }}>
      <Slider
        aria-label="Size"
        defaultValue={0}
        getAriaValueText={valuetext}
        color="secondary"
        step={null}
        marks={marks}
        min={0}
        max={marks.length-1}
        onChange={handleChange}
      />
    </Box>

  </div>
</div>
<div className="p-addtocartWishlist">
{true ? (
  <div className="p-addtowishlist">
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <StarBorderIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
) : (
  <div className="p-addtowishlist"> 
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <StarIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
)}


  <div className="p-addtocart"><Box sx={{ '& > :not(style)': { m: 1 } }} onClick={AddCart}>

<Fab variant="extended">
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Add Item 
      </Fab>
</Box>
</div>


</div>
  </div>
  <div className="p-content-right">

  </div>
 


</div>


</div>
<div className="p-details">




</div>




    </div>
  )
}

export default SelectedProduct