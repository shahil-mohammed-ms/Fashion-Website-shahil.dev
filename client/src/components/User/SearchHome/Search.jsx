import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
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



useEffect(()=>{

const FetchData = async ()=>{
  const queryParams = new URLSearchParams(location.search);
  const qsearch = queryParams.get('qsearch')
  const response = await axios.get(`/User/search/${qsearch}`)
 setProducts(response.data)

}

FetchData()
},[])

 //in clicking product
 const onClickProduct = (id) =>{
  console.log(id)
  navigate(`/selectedProduct?proId=${id}`)
  
    }
    const handleSearch = async(e) =>{
     
      
      const response = await axios.get(`/User/search/${search}`)
      
      setProducts(response.data)
      
      
      }

  return (
    <div className="product-main">

    <div className="header">
<div className="brandlogo"><h2 onClick={()=>navigate('/UserHome')}>fasion-store</h2></div>

<div className="searchbar">
    <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)}  />
    <Fab variant="extended" className="smallFab searchbutton">
<SearchIcon onClick={(e)=>handleSearch(e)} />
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
      <div key={index} className="product-boxes" onClick={() => onClickProduct(product._id)}  >
<div className="product-img" style={{
      backgroundImage: `url(http://localhost:5000/image/images/product/${product.imageUrl[0]})`,
    }}></div>

<div className="product-box-footer">
<div className="product-footer-top">
  <h3>{product.name}</h3>
  <div className="rate-box"><p>RS : {product.price}</p></div>
</div>

<div className="product-addcart">


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

export default Search