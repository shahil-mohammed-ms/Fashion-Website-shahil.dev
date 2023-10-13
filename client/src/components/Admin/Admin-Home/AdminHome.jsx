import {React,useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './AdminHome.css'
import './AdminHome-Mobile.css'

function AdminHome() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
   
    const handleGetUserId = async () => {
      const token = localStorage.getItem('seller-token');
  
      if (token) {
        // Decode the token to get user details
        const decodedToken = jwt_decode(token);
        console.log(decodedToken.userId)
      
      }
      // console.log(token)
    
  
     
    }; 
    handleGetUserId()
   
  }, [])
  


  return (
  
  <div className="main-admin">
    <div className="admin-content">
      {/* <Header/> */}


<div className="bottom-admin">
  <div className="top-carousel">
  <div className="carousel-box" onClick={()=>{navigate('/Adminproductlist')}}>
<h1>Item's</h1>
<ArrowForwardIosSharpIcon className="custom-large-icon"/>
</div>
<div className="carousel-box" onClick={()=>{navigate('/adminAddProduct')}}>
<h1>Add</h1>
<AddCircleSharpIcon className="custom-large-icon"/>

</div>
<div className="carousel-box">
<h1>Edit</h1>
<EditRoundedIcon className="custom-large-icon"/>
</div>
  </div>
<div className="middle-carousel">
<div className="carousel-box">
<h1>Notification's</h1>
<NotificationsActiveRoundedIcon className="custom-large-icon"/>
</div>
<div className="carousel-box dashboard-box">
Dashboard
</div>
</div>


</div>
    </div>

    <div className="footer-admin">
    
    </div>
  </div>
  

  )
}

export default AdminHome