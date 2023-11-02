
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OnlinePayment from './OnlinePayment';
import { Button, Radio, FormControlLabel, RadioGroup, Typography, Container, Grid } from '@mui/material';
import axios from '../../../axios';
import Home from '../User-Home/Home';

function PaymentType() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('cod');
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

  const [Address,setAddress]= useState({

    house:null,
    place:null,
    houseno:null,
    pincode:null,
    phone:null,

  })
  const [CopyAddress,setCopyAddress]= useState({})

  const [house,setHouse] = useState(null)
  const [place,setPlace] = useState(null)
  const [houseno,setHouseno] = useState(null)
  const [pincode,setPincode] = useState(null)
  const [phone,setPhone] = useState(null)
  const [changeAddress,setChangeAddress] = useState(false)
  const [newAddress,setNewAddress] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      setPaymentInfo({
        proId: queryParams.get('proId'),
        userId: queryParams.get('userId'),
        cartId: queryParams.get('cartId'),
        quantity: queryParams.get('quantity'),
        total: queryParams.get('total'),
        name: queryParams.get('name'),
        size: queryParams.get('size'),
        sellerId: queryParams.get('sellerId'),
      });
    };

    fetchData();
  }, [location.search]);

  const handleCodBuy = async () => {

    let passAddress 

    if(Address.name){
       
      passAddress ={...Address}

    }else{

      passAddress = {
        house:house ,
        place:place ,
        houseno: houseno ,
        pincode: pincode,
        phone:phone,

      }

    }

    if(!house){
console.log('no address')
    }else{

      const response = await axios.post('/Order/addorder', {
      COD: 'COD',
      ...paymentInfo,
      address:{...passAddress}
    });
    if (response.data.success) {
      navigate('/UserHome');
    } else {
      navigate(`/cart`);
    }
    }
  
    
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  ///payment?userId=${userId}&cartId=${product.cartId}&proId=${product.productData._id}&quantity=${product.quantity}
 // &name=${product.name}&total=${Math.round(product.productData.price * (1 - (product.productData.discound?.discoundPercentage || 0) / 100) 
 //* (1 - couponDiscount / 100) * productQuantities[index])}&size=${product.sizeType}&sellerId=${product.productData.sellerId}

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Select Payment Method
          </Typography>
        </Grid>

        <div className="addresspanel">

<div className="addressHeader">
<h3>Address</h3>
</div>

{Address && <div><input type="text" className='addressinputs' />  
   <button onClick={()=>{setChangeAddress(true);}} >change address</button> 
   <button onClick={()=>{setNewAddress(true);setAddress(false);}} >New address</button> 
   <br />
{ changeAddress && <div><input type="text" className='addressinputs' placeholder='Address.....' />
 <button onClick={()=>{ setChangeAddress(false);}} >Make default</button><br /></div> }

</div> }

{newAddress && <div className="addinputpannel">
<input type="text" className='addressinputs' value={house} onChange={(e)=>setHouse(e.target.value)} placeholder='house name' /> <br />
<input type="text" className='addressinputs' value={place} onChange={(e)=>setPlace(e.target.value)} placeholder='place' /><br />
<input type="text" className='addressinputs' value={houseno} onChange={(e)=>setHouseno(e.target.value)} placeholder=' house no' /><br />
<input type="text" className='addressinputs' value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder='pincode' /><br />
<input type="text" className='addressinputs' value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='phone no' /><br />
<button onClick={()=>{setAddress(true);setNewAddress(false);}}>Back to defailt Address</button>
</div>}

        </div>


        <Grid item xs={12}>
          <RadioGroup value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Cash on Delivery (COD)"
            />
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="Online Payment"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          {selectedOption === 'online' ? (
            <OnlinePayment paymentInfo={paymentInfo}  isAddress={Address.house||house} MainAddress={{
              house:house ,
              place:place ,
              houseno: houseno ,
              pincode: pincode,
              phone:phone,
      
            }|| Address} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCodBuy}
            >
              Buy COD
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentType;
