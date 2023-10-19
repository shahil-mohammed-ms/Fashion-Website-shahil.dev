import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function SortMenu({ anchorEl, open, handleClose, value, handleChange,handleSort }) {



  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <MenuItem>
            <FormControlLabel value="lowToHigh" control={<Radio size="small" />} label="Price--Low to High" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="highToLow" control={<Radio size="small" />} label="Price--High to Low" />
          </MenuItem>
        </RadioGroup>
      </FormControl>
      <button onClick={handleSort}>Apply</button>
    </Menu>
  );
}

export default SortMenu;
