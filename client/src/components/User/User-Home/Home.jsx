import React,{useState} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from '../../../axios'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import DrawerFunction from '../../DrawerFunction';
import './Home.css'
import './HomeMobile.css'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Home() {
  const navigate = useNavigate();
  const [search,setSearch] = useState('')
  //drawer
  const [state, setState] = useState({
   
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <MenuIcon />
              </ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        
      </List>
      <Divider />
     
    </Box>
  );
 const handleClick=(category)=>{
  console.log(category)
  navigate(`/product?category=${category}`)

  }


// search product based on  name

const handleSearch = async(e) =>{
  e.preventDefault()
  console.log('clicked')

  navigate(`/Search?qsearch=${search}`)
  
  
  
  }



  return (
  <div className="home">

<div className="homeHeader">
<div className="headerLeft">
  <div className="leftBone">
  <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}> 
          <Fab variant="extended">
            <MenuIcon/>
          </Fab>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  </div>
</div>
<div className="headerMiddle">
  {/* <div className="searchBox"> 
   <Fab variant="extended">
      
      <Search>
          <SearchIconWrapper>
          <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
    </Fab>
    </div> */}
    <div className="searchbar">
      <input type="text" className="search-input" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      <Fab variant="extended" className="smallFab searchbutton">
<SearchIcon onClick={(e)=>handleSearch(e)}  />
</Fab>
    </div>
    </div>

<div className="headerRight">
  <div className="headRight-sub">
  <div className="rightBox">
  <Fab variant="extended">

</Fab>
  </div>
   <div className="rightBox">
  <Fab variant="extended">

</Fab>
  </div>
  <div className="rightBox">
  <Fab variant="extended">
 
</Fab>
  </div>
  <div className="rightBox">
  <Fab variant="extended">

</Fab>
  </div>
  
  </div>

 

</div>

</div>
<div className="Home-body">
  {/* <div className="head-dress"> <h1>Dress</h1></div> */}
  
<div className="Home-dress">

<div className="men-box">
  <div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Men's Fashion</p></div>
  <div className="aicon" onClick={() => handleClick('Mens')}><ArrowForwardIcon fontSize="small"/></div>

</div>
<div className="women-box">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Women's Fashion</p></div>
  <div className="aicon" onClick={() => handleClick('Womens')}><ArrowForwardIcon fontSize="small"/></div>

</div>
<div className="kid-box">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Kid's Fashion</p></div>
  <div className="aicon" onClick={() => handleClick('Kids')}><ArrowForwardIcon fontSize="small"/></div>
</div>

</div>
{/* <div className="head-dress"><h1 >Foot Wear</h1></div> */}
<div className="home-shoes-1">

<div className="aicon aicon-left"><NavigateBeforeIcon fontSize="large"/></div>
<div className="aicon aicon-right"><NavigateNextIcon fontSize="large"/></div>
<div className="shoe-box-content">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Foot Wear</p></div>
  <div className="aicon" onClick={() => handleClick('Foot wear')}><ArrowForwardIcon fontSize="small"/></div>
</div>


</div>
{/* <div className="head-dress"><h1 >Cosmetics & </h1></div> */}
<div className="cosmetics-grooming">
<div className="cosmetics-box">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Cosmetic's</p></div>
  <div className="aicon" onClick={() => handleClick('Cosmetics')}><ArrowForwardIcon fontSize="small" /></div>
</div>
<div className="grooming-box">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Grooming</p></div>
  <div className="aicon" onClick={() => handleClick('Grooming')}><ArrowForwardIcon fontSize="small" /></div>
</div>
<div className="handbags-box">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Hand Bag's</p></div>
  <div className="aicon" onClick={() => handleClick('Hand bag')}><ArrowForwardIcon fontSize="small"/></div>

</div>

</div><div className="home-watch-1">

<div className="aicon aicon-left"><NavigateBeforeIcon fontSize="large"/></div>
<div className="aicon aicon-right"><NavigateNextIcon fontSize="large"/></div>
<div className="watch-box-content">
<div className="a1"> <h3>SHOP</h3></div>
  <div className="a2"><p>Watch</p></div>
  <div className="aicon" onClick={() => handleClick('Watch')}><ArrowForwardIcon fontSize="small"/></div>
</div>


</div>


</div>

  </div>
  )
}

export default Home