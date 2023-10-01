import React, { useState } from 'react';
import TestOne from './TestOne';
import axios from '../axios'
import './Test.css'



function TestEnv() {  
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const handleBuyButtonClick = () => {
    setShowPayPalButton(true);
  };

  return (
    <div>
      <h1>Your React App</h1>
      <button onClick={handleBuyButtonClick}>Buy</button>
      {showPayPalButton && <TestOne />}
    </div>
  )
}

export default TestEnv