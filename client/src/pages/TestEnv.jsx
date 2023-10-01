import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TestOne from './TestOne'
import axios from '../axios'
import './Test.css'



function TestEnv() {  
  const [isMobile, setIsMobile] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };



  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Your Logo
      </Typography>
      {isMobile ? (
        <div className="mobile-menu">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </div>
      ) : (
        <div className="desktop-menu">
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </div>
      )}
      <IconButton color="inherit" onClick={toggleMobileMenu}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
  )
}

export default TestEnv