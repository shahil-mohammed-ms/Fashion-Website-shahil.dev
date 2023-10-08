import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation, Navigate } from 'react-router-dom';
import OnlinePayment from './OnlinePayment';
import { Button } from '@mui/material';
import axios from '../../../axios'

function PaymentType() {
  const navigate = useNavigate();
 const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('cod');
  const[proId,setProId] = useState(null)
  const[userId,setUserId] = useState(null)
  const[cartId,setCartId] = useState(null)
  const[quantity,setQuantity] = useState(null)
  const[total,setTotal] = useState(null)
  const[name,setName] = useState(null)
  const [size,setSize] = useState(null)
  const [sellerId,setSellerId] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState({
    proId: null,
    userId: null,
    cartId: null,
    quantity: null,
    total: null,
    name: null,
    size: null,
    sellerId: null,
  });
  

  useEffect(() => {
    // Move your data fetching logic into the useEffect hook
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      setProId(queryParams.get('proId'));
      setUserId(queryParams.get('userId'));
      setCartId(queryParams.get('cartId'));
      setQuantity(queryParams.get('quantity'));
      setTotal(queryParams.get('total'));
      setName(queryParams.get('name'));
      setSize(queryParams.get('size'));
      setSellerId(queryParams.get('sellerId'));



    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [location.search]);
  useEffect(() => {
    // Set the paymentInfo object based on the existing state variables
    setPaymentInfo({
      proId,
      userId,
      cartId,
      quantity,
      total,
      name,
      size,
      sellerId,
    });
  }, [proId, userId, cartId, quantity, total, name, size, sellerId]);

//cod payment
const handleCodBuy = async()=>{

  const response = await axios.post('/Order/addorder',{
    COD:'COD',
    proId,
    userId,
    cartId,
    quantity,
    total,
    name,
    size,
    sellerId

  })
  if(response.data.success){

    navigate('/UserHome')
  }else{
    navigate('/cart')
  
  }
}





  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div>
    <label>
      <input
        type="radio"
        value="cod"
        checked={selectedOption === 'cod'}
        onChange={handleOptionChange}
      />
      Cod
    </label>

    <label>
      <input
        type="radio"
        value="online"
        checked={selectedOption === 'online'}
        onChange={handleOptionChange}
      />
      Online
    </label>
    {selectedOption === 'online' ? (<OnlinePayment paymentInfo={paymentInfo} />):(<button onClick={handleCodBuy}>Buy COD</button>)}
  </div>
  )
}

export default PaymentType