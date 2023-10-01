import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SortMenu from './SortMenu';
import RatingMenu from './RatingMenu';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import axios from '../../../axios'
import './Products.css';

function Products() {
  // Price menu
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const [category,setCategory] = useState('')
  const priceOpen = Boolean(priceAnchorEl);
  const location = useLocation();
  const navigate = useNavigate();
const [products,setProducts] = useState([])


  useEffect(() => {

    const fetchData = async () =>{
try{
  const queryParams = new URLSearchParams(location.search);
  // const category =await
  setCategory(queryParams.get('category'))  
  
const response = await axios.get(`/User/getProducts/${queryParams.get('category')}`)
console.log(response.data)
setProducts(response.data)
}catch(e){
console.log(e)
}
      
    }
    fetchData()
   
  }, [])

  const handlePriceClick = (event) => {
    setPriceAnchorEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setPriceAnchorEl(null);
  };

  // Rating menu
  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);
  const ratingOpen = Boolean(ratingAnchorEl);

  const handleRatingClick = (event) => {
    setRatingAnchorEl(event.currentTarget);
  };

  const handleRatingClose = () => {
    setRatingAnchorEl(null);
  };

  // Radio group
  const [value, setValue] = useState('female');
  

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  //in clicking product
  const onClickProduct = (id) =>{
console.log(id)
navigate(`/selectedProduct?proId=${id}&category=${category}`)

  }

  return (
    <div className="product-main">
      
      <div className="topContent">

        
        <div className="sideBar">
          <h1 onClick={()=>{
            navigate('/UserHome')
          }}>Fashion-Hub</h1>
          <div className='side-box a'>
            <Button
              id="price-button"
              aria-controls={priceOpen ? 'price-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={priceOpen ? 'true' : undefined}
              onClick={handlePriceClick}
            >
              <Box>
                <Fab variant="extended">Sorted By</Fab>
              </Box>
            </Button>

            <SortMenu
              anchorEl={priceAnchorEl}
              open={priceOpen}
              handleClose={handlePriceClose}
              value={value}
              handleChange={handleChange}
            />
          </div>
          <div className='side-box b'>
            <Button
              id="rating-button"
              aria-controls={ratingOpen ? 'rating-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={ratingOpen ? 'true' : undefined}
              onClick={handleRatingClick}
            >
              <Box>
                <Fab variant="extended">Rating</Fab>
              </Box>
            </Button>

            <RatingMenu
              anchorEl={ratingAnchorEl}
              open={ratingOpen}
              handleClose={handleRatingClose}
              value={value}
              handleChange={handleChange}
            />
          </div>
        


        </div>
        <div className="product-main-sub">

          <div className="product-header">
          <Box>
              <Fab variant='extended'>

              </Fab>
            </Box>
            <Box>
              <Fab variant='extended'>
shahil mohammed
              </Fab>
            </Box>

          </div>
          
        {products.map((product, index) => (
        <div key={index} className="product-boxes" onClick={() => onClickProduct(product._id)}  >
<div className="product-img" style={{
        backgroundImage: `url(http://localhost:5000/image/images/product/${product.imageUrl[0]})`,
      }}></div>

<div className="product-box-footer">
  <div className="product-footer-top">
    <h3>{product.name}</h3>
    <div className="star-icon"><StarBorderIcon/></div>
  </div>
  <div className="rate-box"><p>RS : {product.price}</p></div>
<div className="product-addcart">
  <Box>
    <Fab variant="extended" size="small">
      <p>Add to Cart</p>
    </Fab>
  </Box>
</div>

</div>

        </div>
      ))}

        </div>
       
      </div>
      <div className="footer">
        {/* Your footer */}
      </div>
    </div>
  )
}

export default Products;
