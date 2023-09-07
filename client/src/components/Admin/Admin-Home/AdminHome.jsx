import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import './AdminHome.css'

function AdminHome() {
  return (
  <>
  <div className="main-admin">
    <div className="admin-content">

<div className="header-admin">
  <div className="header-left">
  <h1>Fashion-Hub Admin</h1>
  </div>
  
  <div className="header-right">
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

</div>
<div className="bottom-admin">
  <div className="top-carousel">
  <div className="carousel-box">
<h1>Item's</h1>
<ArrowForwardIosSharpIcon className="custom-large-icon"/>
</div>
<div className="carousel-box">
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

</div>
</div>


</div>
    </div>

   
  </div>
  <div className="footer-admin">
    
  </div>
  </>
  )
}

export default AdminHome