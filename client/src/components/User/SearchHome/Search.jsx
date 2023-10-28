import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../../axios';
import './Search.css'
import './SearchMobile.css'

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
const [products,setProducts] = useState([])
const [search,setSearch] = useState('')
// for scrolling loading
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [userWishlist, setUserWishlist] = useState([]);
const initialLoadRef = useRef(false);
const scrollSearchRef = useRef(false);
const [userId,setUserId] = useState(null)

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

const FetchData = async (currentPage)=>{

  setLoading(true);

  setTimeout( async() => {

    const queryParams = new URLSearchParams(location.search);
    const qsearch = queryParams.get('qsearch')
    const response = await axios.get(`/User/search/${qsearch}/${currentPage}`)
    setProducts((prevProducts) => [...prevProducts, ...response.data])
  
    setLoading(false);

  }, 1000);



}


useEffect(()=>{
  if (!initialLoadRef.current) {
    FetchData()
     initialLoadRef.current = true;
     }
},[])

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
      

      if(search.length===0){
        FetchData(nextPage)
      }else{
         handleSearch(nextPage)
         console.log(nextPage);
      }
     

    }
  }
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [loading]);



 //in clicking product
 const onClickProduct = (id) =>{
  console.log(id)
  navigate(`/selectedProduct?proId=${id}`)
  
    }


    const handleSearch = async(currentPage) =>{

      // e.preventDefault()

      setLoading(true);
      if (!scrollSearchRef.current) {
        console.log('Clearing products array');
        setProducts([]);
        setPage(1)
        scrollSearchRef.current = true;
      } else {
        console.log('Appending to products array');
      }


        setTimeout( async() => {
          const response = await axios.get(`/User/search/${search}/${currentPage}`)
          
       setProducts((prevProducts) => [...prevProducts, ...response.data])
        
          setLoading(false);
      
        }, 1000);

   

      //  const nextPage = page + 1;
      // setPage(nextPage);
      
       
     
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
    <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}  />
    <Fab variant="extended" className="smallFab searchbutton">
<SearchIcon onClick={(e)=>{handleSearch(e)}} />
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

      <div className="product-main-sub">

      {products.map((product, index) => (
      <div key={index} className="product-boxes"  >
<div className="product-img" style={{
      backgroundImage: `url(http://localhost:5000/image/images/product/${product.imageUrl[0]})`,
    }}  onClick={() => onClickProduct(product._id)}></div>

<div className="product-box-footer">
<div className="product-footer-top">
  <h3>{product.name}</h3>
  <div className="rate-box"><p>RS : {product.price}</p></div>
</div>

<div className="product-addcart">


{!userWishlist.includes(product._id) ? (
<div className="p-addtowishlist">
  <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={(e)=>{AddtoWistlist(product._id);e.preventDefault()}}>
    <Fab variant="extended">
      <StarBorderIcon sx={{ mr: 1 }} />
      Wish list
    </Fab>
  </Box>
</div>
) : (
<div className="p-addtowishlist"> 
  <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={(e)=>{RemoveFromWistlist(product._id);e.preventDefault()}}>
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

export default Search