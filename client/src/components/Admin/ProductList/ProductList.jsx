import {React,useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from '../../../axios'
import Header from '../Header';
import './ProductList.css'

function ProductList() {
  const [productList,setProductList] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
   
    const handleGetUserId = async () => {
      const token = localStorage.getItem('seller-token');
  
      if (token) {
        // Decode the token to get user details
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.userId)
      const sellerId = decodedToken.userId
        const fetchData=await axios.post(`/Admin/getSellerItemsList`,{sellerId})
        setProductList(fetchData.data)
        console.log(fetchData.data)
      }
      
    
  
     
    }; 
    handleGetUserId()
   
  }, [])
 

  return (
    <>
    
   <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity Left</th>
            <th>Quantity Sold</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product,index) => (
            <tr key={product.id}>
              <td>
              <img src={`http://localhost:5000/image/images/product/${product.imageUrl[0]}`}  alt={product.name} width="50" height="50" className='proImg' />
              {/* <img
  src={`http://localhost:5000/image/images/product/${product.imageUrl[0]}`}
  alt={product.name}
  width="50"
  height="50"
  className='proImg blurred'
  onLoad={(e) => {
    e.target.classList.remove('blurred');
  }}
/> */}

                
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.quantitySold}</td>
              <td>RS : {product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductList