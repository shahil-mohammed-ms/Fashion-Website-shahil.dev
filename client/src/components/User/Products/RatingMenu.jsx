import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function RatingMenu({ anchorEl, open, handleClose, value, handleChange }) {
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
            <FormControlLabel value="five" control={<Radio size="small" />} label="Five star" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="four" control={<Radio size="small" />} label="Four star" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="three" control={<Radio size="small" />} label="Three star" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="two" control={<Radio size="small" />} label="Two star" />
          </MenuItem>
          <MenuItem>
            <FormControlLabel value="one" control={<Radio size="small" />} label="One star" />
          </MenuItem>
        </RadioGroup>
      </FormControl>
    </Menu>
  );
}

export default RatingMenu;
