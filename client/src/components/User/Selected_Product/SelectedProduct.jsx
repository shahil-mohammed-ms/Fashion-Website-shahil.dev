import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Breadcrumb from './Breadcrumb';
import './SelectedProduct.css'
import Slider from '@mui/material/Slider';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const valueToLabel = {
  0: 's',
  1: 'm',
  2: 'l',
  3: 'xl',
  4: 'xxl',
};

const marks = [
  { value: 0, label: 's' },
  { value: 1, label: 'm' },
  { value: 2, label: 'l' },
  { value: 3, label: 'xl' },
  { value: 4, label: 'xxl' },
];

function valuetext(value) {
  console.log(valueToLabel[value])
  return valueToLabel[value];
}
function SelectedProduct() {
  

  return (
    <div className="selectedProduct-main">

<div className="s-product-Top">
<Breadcrumb handleClick={handleClick}/>

</div>
<div className="imgAndContent">
<div style={{paddingTop:'20px'}}>
<div className="p-image"></div>
</div>


<div className="p-content">
  <div className="p-content-left">
  <div className="p-content-header">
    <h1>Your's product</h1>
   
  </div>
<div className="p-contnt-price">
  <h3>Rs: 1200</h3>
</div>
<div className="p-quantity">
<Box sx={{ '& > :not(style)': { m: 1 } }}>
<Fab size="small" color="secondary" aria-label="add">
<RemoveIcon/>
      </Fab>
      <Fab size="medium" color="secondary" aria-label="add">
        1
      </Fab>
      <Fab size="small" color="secondary" aria-label="add">
      <AddIcon />
      </Fab>
</Box>
</div>
<div className="sizes">
  <div className="size-header"><h2>size</h2></div>
  <div className="sizecomponent">

 
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Size"
        defaultValue={0}
        getAriaValueText={valuetext}
        color="secondary"
        step={null}
        marks={marks}
        min={0}
        max={4}
      />
    </Box>

  </div>
</div>
<div className="p-addtocartWishlist">
{true ? (
  <div className="p-addtowishlist">
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <StarBorderIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
) : (
  <div className="p-addtowishlist"> 
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <StarIcon sx={{ mr: 1 }} />
        Wish list
      </Fab>
    </Box>
  </div>
)}


  <div className="p-addtocart"><Box sx={{ '& > :not(style)': { m: 1 } }}>

<Fab variant="extended">
        <ShoppingCartIcon sx={{ mr: 1 }} />
        Add Item 
      </Fab>
</Box>
</div>


</div>
  </div>
  <div className="p-content-right">

  </div>
 


</div>


</div>
<div className="p-details">




</div>




    </div>
  )
}

export default SelectedProduct