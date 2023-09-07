import React from 'react';
import axios from '../axios';

function TestOne() {
  const handleClick = async () => {

    try {
      const yourJwtTokenHere =await localStorage.getItem('token');
      const response = await axios.get('/getId', {
        headers: {
          Authorization: `Bearer ${yourJwtTokenHere}`,
        },
      });
      ;
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default TestOne;
