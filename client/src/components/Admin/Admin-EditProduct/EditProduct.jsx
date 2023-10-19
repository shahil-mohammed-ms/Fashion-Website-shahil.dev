import {React,useState,useEffect} from 'react'
import { useNavigate,useLocation} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from '../../../axios'
import './EditProduct.css'
//material UI icons
import CloseIcon from '@mui/icons-material/Close';

function EditProduct() {
  const [productList,setProductList] = useState([])
  const [discount,setDiscount] = useState( null)
  const [productIdDiscount,setProductIdDiscount] = useState( null)
  const [closebtn,setClosebtn] = useState(false)
  const [productIdCoupon,setProductIdCoupon] = useState( null)
  const [couponName,setCouponName] = useState( null)
  const [couponCode,setCouponCode] = useState( null)
  const [couponDiscount,setCouponDiscound] = useState( null)
   const [couponExpiryDate,setCouponExpiryDate] = useState( null)
  const [closeCouponbtn,setCloseCouponbtn] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

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
        console.log(fetchData.data[0].discound)
        
      }
      
    
  
     
    }; 
    handleGetUserId()
   
  }, [])

  // delete product 

const deleteProduct = async (proId)=>{

const response = await axios.post('/Admin/deleteproduct',{proId})

if(response.data.response){

  window.location.reload();
}

}
const handleApplyDiscount = async (e)=>{
  e.preventDefault()

  const response = await axios.post('/Admin/updateDiscount',{productIdDiscount,discount})
console.log(response.data)
  if(response.data.response== true){

    setClosebtn(!closebtn)
  }
}
// adding coupon
const handleApplyCoupon = async (e)=>{
  e.preventDefault()
  console.log(couponName)
  console.log(couponCode)
  console.log(couponDiscount)
  console.log(couponExpiryDate)
  console.log(productIdCoupon)
 

 const response = await axios.post('/Admin/Coupon',{productIdCoupon,couponName,couponCode,couponDiscount,couponExpiryDate})
console.log(response.data)
  if(response.data.response== true){

    setCloseCouponbtn(!closeCouponbtn)
  }

}
 
  return (
    <div className='editmain'>
    
   <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity </th>
            <th>Price</th>
            {/* <th>Edit</th>
            <th>Discound</th>
            <th>coupon</th>
            <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {productList.map((product,index) => (
            <tr key={product._id}>
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
              <td>RS : {product.price.toFixed(2)}</td>
              <td ><button onClick={()=>{navigate(`/Edit?proId=${product._id}`)}}><span>Edit</span></button></td>
              <td><button onClick={()=>{ setClosebtn(!closebtn);setDiscount(product.discound?.discoundPercentage);setProductIdDiscount(product._id) }}><span>Discount</span></button></td>
              <td><button onClick={()=>{
                setCloseCouponbtn(!closeCouponbtn)
                setProductIdCoupon(product._id)

              }}><span>Coupon</span></button></td>
              <td><button onClick={()=>{deleteProduct(product._id)}} ><span>Delete</span></button></td>
            </tr>
            
          ))}
        </tbody>
      </table>
     {closebtn && <div className="discountBox">
     <div className="d-closelogo">
    <span onClick={() => { setClosebtn(!closebtn) }}>
      <CloseIcon />
    </span>
  </div>
        <div className="d-header"><h1>Discound</h1></div>
        <form action="" onSubmit={handleApplyDiscount}>
        <div className="d-content">
        <input
            type="number"
            name="discount"
            placeholder={discount}
            value={discount}
            id="discount"
            onChange={(e) => {
              setDiscount(parseInt(e.target.value, 10));
            }}
          />
        </div>
       
        
<button type='submit'><span>Apply</span></button>
</form>
      </div>}
      {closeCouponbtn && <div className="discountBox">
     <div className="d-closelogo">
    <span onClick={() => { setCloseCouponbtn(!closeCouponbtn) }}>
      <CloseIcon />
    </span>
  </div>
        <div className="d-header"><h1>Coupon</h1></div>
        <form action="" onSubmit={handleApplyCoupon}>
        <div className="d-content">
        <div className="dinputBox">
            <label htmlFor="">Coupon code</label>
            <input
            type="string"
            name="code"
            placeholder='type code...'
            value={couponCode}
            id="code"
            onChange={(e) => {
              setCouponCode(e.target.value);
            }}
          /></div>
          <div className="dinputBox">
            <label htmlFor="">name</label>
            <input
            type="string"
            name="discount"
            placeholder='type name...'
            value={couponName}
            id="discount"
            onChange={(e) => {
              setCouponName(e.target.value);
            }}
          /></div>

          <div className="dinputBox">
            <label htmlFor="">discount percentage</label>
              <input
            type="number"
            name="discount"
            placeholder='enter percentage'
            value={couponDiscount}
            id="discount"
            onChange={(e) => {
              setCouponDiscound(parseInt(e.target.value, 10));
            }}
          /></div>
          <div className="dinputBox">
  <label htmlFor="discount">Expiry date</label>
  <input
    type="date"
    name="discount"
    placeholder="enter percentage"
    value={couponExpiryDate}
    id="discount"
    onChange={(e) => {
      const selectedDate = e.target.value;
      console.log(selectedDate); // Log the selected date to the console
      setCouponExpiryDate(selectedDate);
    }}
  />
</div>


        </div>
       
        
<button type='submit'><span>Apply coupon</span></button>
</form>
      </div>}
    </div>
  )
}

export default EditProduct