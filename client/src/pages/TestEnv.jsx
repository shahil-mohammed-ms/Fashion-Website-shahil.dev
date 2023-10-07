import React, { useState } from 'react';

import TestOne from './TestOne'
import axios from '../axios'
import './Test.css'



function TestEnv() {  
  



  return (
  <div className="main">
   
   <div className="searchbar">
      <input type="text" className="search-input" placeholder="Search..." />
      <button className="search-button">Search</button>
    </div>
  </div>
  )
}

export default TestEnv