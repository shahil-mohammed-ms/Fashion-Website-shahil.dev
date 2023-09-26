import React from 'react';
import { useNavigate } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function Breadcrumb({ handleClick,type }) {
  const navigate = useNavigate();
 //onClick={handleClick}
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}  
          onClick={()=>{navigate('/UserHome')}}
        />
        <StyledBreadcrumb component="a" href="#" label="product's" onClick={()=>{navigate(`/product?category=${type}`)}} />
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
