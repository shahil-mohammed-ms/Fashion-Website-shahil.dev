import React from 'react'

import Breadcrumb from './Breadcrumb';
import './SelectedProduct.css'



function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
function SelectedProduct() {
  
  
  return (
    <div className="selectedProduct-main">

<div className="s-product-Top">
<Breadcrumb handleClick={handleClick}/>

</div>
<div className="imgAndContent">
<div className="p-image"></div>
<div className="p-content"></div>


</div>




    </div>
  )
}

export default SelectedProduct