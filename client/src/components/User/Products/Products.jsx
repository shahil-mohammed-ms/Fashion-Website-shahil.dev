import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SortMenu from './SortMenu';
import RatingMenu from './RatingMenu';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import './Products.css';

function Products() {
  // Price menu
  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const priceOpen = Boolean(priceAnchorEl);

  const handlePriceClick = (event) => {
    setPriceAnchorEl(event.currentTarget);
  };

  const handlePriceClose = () => {
    setPriceAnchorEl(null);
  };

  // Rating menu
  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);
  const ratingOpen = Boolean(ratingAnchorEl);

  const handleRatingClick = (event) => {
    setRatingAnchorEl(event.currentTarget);
  };

  const handleRatingClose = () => {
    setRatingAnchorEl(null);
  };

  // Radio group
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="product-main">
      
      <div className="topContent">

        
        <div className="sideBar">
          <h1>Fashion-Hub</h1>
          <div className='side-box a'>
            <Button
              id="price-button"
              aria-controls={priceOpen ? 'price-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={priceOpen ? 'true' : undefined}
              onClick={handlePriceClick}
            >
              <Box>
                <Fab variant="extended">Sorted By</Fab>
              </Box>
            </Button>

            <SortMenu
              anchorEl={priceAnchorEl}
              open={priceOpen}
              handleClose={handlePriceClose}
              value={value}
              handleChange={handleChange}
            />
          </div>
          <div className='side-box b'>
            <Button
              id="rating-button"
              aria-controls={ratingOpen ? 'rating-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={ratingOpen ? 'true' : undefined}
              onClick={handleRatingClick}
            >
              <Box>
                <Fab variant="extended">Rating</Fab>
              </Box>
            </Button>

            <RatingMenu
              anchorEl={ratingAnchorEl}
              open={ratingOpen}
              handleClose={handleRatingClose}
              value={value}
              handleChange={handleChange}
            />
          </div>
        


        </div>
        <div className="product-main-sub">

          <div className="product-header">
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
          
        {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="product-boxes">
<div className="product-img"></div>
<div className="product-box-footer">
  <div className="product-footer-top">
    <h3>Burmuda-nikkar</h3>
    <div className="star-icon"><StarBorderIcon/></div>
  </div>
  <div className="rate-box"><p>RS : 1200</p></div>
<div className="product-addcart">
  <Box>
    <Fab variant="extended" size="small">
      <p>Add to Cart</p>
    </Fab>
  </Box>
</div>

</div>

        </div>
      ))}

        </div>
       
      </div>
      <div className="footer">
        {/* Your footer */}
      </div>
    </div>
  )
}

export default Products;
