// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Menu';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';

// function DrawerFunction({ onToggleDrawer }) {
//   // drawer
//   const [state, setState] = useState({
//     left: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton>
//             <ListItemIcon>
//               <MenuIcon />
//             </ListItemIcon>
//             <ListItemText />
//           </ListItemButton>
//         </ListItem>
//       </List>
//       <Divider />
//     </Box>
//   );

//   return (
//     <div>
//       <React.Fragment key={'left'}>
//         <Button onClick={onToggleDrawer('left', true)}>
//           <Fab variant="extended">
//             <MenuIcon />
//           </Fab>
//         </Button>
//         <Drawer anchor={'left'} open={state['left']} onClose={onToggleDrawer('left', false)}>
//           {list('left')}
//         </Drawer>
//       </React.Fragment>
//     </div>
//   );
// }

// export default DrawerFunction;
