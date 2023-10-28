import React, { useState, useEffect,useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SortMenu from './SortMenu';
import RatingMenu from './RatingMenu';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';


import axios from '../../../axios'
import './Products.css';
import './ProductMobile.css';

function Products() {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  // Price menu
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const [category,setCategory] = useState('')
  const priceOpen = Boolean(priceAnchorEl);
  const location = useLocation();
  const navigate = useNavigate();
const [products,setProducts] = useState([])
const [search,setSearch] = useState('')
// for scrolling loading
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [userId,setUserId] = useState(null)
const [userWishlist, setUserWishlist] = useState([]);

useEffect(()=>{
  const getData = async()=>{
    const token = localStorage.getItem('Usertoken');
    
    if (token) {
      // Decode the token to get user details
      const decodedToken = jwt_decode(token);
      console.log(decodedToken.userId)
      setUserId(decodedToken.userId)

const response = await axios.post('/User/getUserDetails',{userId:decodedToken.userId})
setUserWishlist(response.data.Wishlist)

console.log(response.data.Wishlist)
    
    }
  }
  getData()
  
    },[userId])

// getting products
const fetchProductData = async (currentPage) =>{
  setLoading(true);
  setTimeout( async() => {
    try{
    
      const queryParams = new URLSearchParams(location.search);
      // const category =await
      setCategory(queryParams.get('category'))  
      
    const response = await axios.get(`/User/getProducts/${queryParams.get('category')}/${+currentPage}`)
    
   
    setProducts((prevProducts) => [...prevProducts, ...response.data])

    setLoading(false);
    }catch(e){
      setLoading(false);
    console.log(e)
    }

  }, 1000);
 
        
      }

      const initialLoadRef = useRef(false);

  useEffect(() => {
    if (!initialLoadRef.current) {
      fetchProductData();
       initialLoadRef.current = true;
       console.log('1');
       }
      }, []);

      


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom of the page
      if (!loading) {
        console.log(page);
        const nextPage = page + 1;
        setPage(nextPage);
        console.log(nextPage);
        fetchProductData(nextPage);

      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);



  const handlePriceClick =async (event) => {
    
    setPriceAnchorEl(event.currentTarget);

  };

  //                                                                        & sort menu
  const handleSort =async ()=>{
// if event.currentTarget=== names then fetch data and setproduct value

setPriceAnchorEl(null);

if(value === 'highToLow' || value === 'lowToHigh'){
 
try {
  
  const queryParams = new URLSearchParams(location.search);
   
  
      
      const categoryValue =queryParams.get('category')
 
     const response = await axios.get(`/User/getSortData/${categoryValue}/${value}`)
     console.log(response.data)
     setProducts(response.data)
     
} catch (error) {
  console.log(error)
}




}else{

  console.log('check')
}

  }

  const handlePriceClose = () => {
    setPriceAnchorEl(null);
  };

  //                                                                                Rating 

  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);
  const ratingOpen = Boolean(ratingAnchorEl);

  const handleRatingClick = (event) => {
    // console.log(event.currentTarget)
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

// search product based on category and name

const handleSearch = async(e) =>{
e.preventDefault()

const response = await axios.get(`/User/searchonCategory/${category}/${search}`)

setProducts(response.data)


}

// wishlist  setProducts((prevProducts) => [...prevProducts, ...response.data])

const AddtoWistlist = async (proId)=>{
console.log(userWishlist)
setUserWishlist((prev) => [...prev, proId]);

console.log(userWishlist);
  const response = await axios.post(`/User/addtoWishlist`,{
    proId:proId,
    userId:userId

  })

}
const RemoveFromWistlist = async (proId)=>{
  console.log(userWishlist)
  setUserWishlist(userWishlist.filter((id) => id !== proId));
  console.log(userWishlist)
  const response = await axios.post(`/User/removefromWishlist`,{
    proId:proId,
    userId:userId

  })

}


  return (
    <div className="product-main">

      <div className="header">
<div className="brandlogo"><h2 onClick={()=>navigate('/UserHome')}>fasion-store</h2></div>

<div className="searchbar">
      <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      {/* <Fab variant="extended" className="smallFab searchbutton">
<SearchIcon onClick={(e)=>handleSearch(e)} />
</Fab> */}
<Fab variant="extended" className="smallFab searchbutton" onClick={(e) => handleSearch(e)}>
  <SearchIcon />
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
      
      <div className="topContent">

        
        {/* <div className="sideBar"> */}
         
          <div className="sortrating">

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
              handleSort={handleSort}
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
        {/* </div> */}
        <div className="product-main-sub">

        {products.map((product, index) => (
        <div  key={product._id} className="product-boxes"   >
<div className="product-img" style={{
        backgroundImage: `url(http://localhost:5000/image/images/product/${product.imageUrl[0]})`,
      }}   
      onClick={() => onClickProduct(product._id)}  ></div>

<div className="product-box-footer">
  <div className="product-footer-top">
    <h3>{product.name}</h3>
    <div className="rate-box"><p>RS : {product.price}</p></div>
  </div>
  
<div className="product-addcart">


{!userWishlist.includes(product._id) ? (
  <div className="p-addtowishlist notwished" >
    <Box sx={{ '& > :not(style)': { m: 1 } }}  onClick={(e)=>{AddtoWistlist(product._id);e.preventDefault()}} >
      <Fab variant="extended">
        <StarBorderIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
) : (
  <div className="p-addtowishlist wished"> 
    <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={(e)=>{RemoveFromWistlist(product._id);e.preventDefault()}} >
      <Fab variant="extended">
        <StarIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
)}
</div>

</div>


        </div>
        
      ))}

        </div>
     
       
      </div>
         {loading && (
      <div className="loadingbar">
<Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      </div>  
      )}
    
    </div>
  )
}

export default Products;
