import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import './Header.css'

function Header() {
  return (
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
  )
}

export default Header